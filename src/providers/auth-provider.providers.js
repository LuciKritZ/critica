import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { notification } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import useAuthStore from '../stores/auth.store';
import LoadingIndicator from '../components/loading-indicator/loading-indicator.component';
import MESSAGES from '../utils/messages.utils';
import { getUser } from '../rest/user.rest';
import { DEFAULT_ROLES, ADMIN_ROLE } from '../utils/roles.utils';

export const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const [
        role,
        authenticated,
        accessToken,
        setAccessToken,
        clearAccessToken,
        userId,
        setUserInfo,
        isAdmin,
        email,
        image,
    ] = useAuthStore((state) => [
        state.role,
        state.authenticated,
        state.accessToken,
        state.setAccessToken,
        state.clearAccessToken,
        state.userId,
        state.setUserInfo,
        state.isAdmin,
        state.email,
        state.image,
    ]);

    const performLogin = async (formData) => {
        if (authenticated) {
            return true;
        }

        try {
            setAuthLoading(true);
            const request = {
                firstName: formData.profileObj.givenName,
                lastName: formData.profileObj.familyName,
                email: formData.profileObj.email,
            };
            const auth = await getUser(request);

            if (!auth || !auth.access_token) {
                notification.error({
                    message: MESSAGES.LABELS.ERROR,
                    description: MESSAGES.AUTHENTICATION.ERROR,
                    duration: MESSAGES.DURATION,
                });
                return false;
            }

            setAccessToken(auth.access_token);
            console.log(auth.role, 'auth', auth);
            setUserInfo(
                auth.id,
                auth.isAdmin,
                auth.role,
                formData.profileObj.imageUrl,
                auth.email,
                auth.isPremium,
            );
            history.push(pathname);
        } catch (error) {
            notification.error({
                message: MESSAGES.LABELS.ERROR,
                description: error.response.message,
                duration: MESSAGES.DURATION,
            });
            return false;
        } finally {
            setAuthLoading(false);
        }

        return true;
    };

    const performLogout = () => {
        setAuthLoading(true);
        clearAccessToken();
        notification.success({
            message: MESSAGES.LABELS.SUCCESS,
            description: MESSAGES.AUTHENTICATION.LOGOUT_SUCCESS,
            duration: MESSAGES.DURATION,
        });
        setAuthLoading(false);
    };

    const authContext = {
        authenticated,
        accessToken,
        userId,
        isAdmin,
        role,
        email,
        image,
        signIn: performLogin,
        signOut: performLogout,
    };

    if (authLoading) {
        return <LoadingIndicator fullScreen />;
    }

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
