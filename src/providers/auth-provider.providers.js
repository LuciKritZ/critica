import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { notification } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import useAuthStore from '../stores/auth.store';
import LoadingIndicator from '../components/loading-indicator/loading-indicator.component';
import MESSAGES from '../utils/messages.utils';
import { login } from '../rest/authentication.rest';
import { DEFAULT_ROLES, ADMIN_ROLE } from '../utils/roles.utils';
import { useUserInfo } from './user.providers';

export const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(false);
    const history = useHistory();
    const { updateUser } = useUserInfo();
    const [
        role,
        authenticated,
        accessToken,
        setAccessToken,
        clearAccessToken,
        userId,
        setUserInfo,
        isAdmin,
    ] = useAuthStore((state) => [
        state.role,
        state.authenticated,
        state.accessToken,
        state.setAccessToken,
        state.clearAccessToken,
        state.userId,
        state.setUserInfo,
        state.isAdmin,
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
            const auth = await login(request);

            if (!auth || !auth.access_token) {
                notification.error({
                    message: MESSAGES.LABELS.ERROR,
                    description: MESSAGES.AUTHENTICATION.ERROR,
                    duration: MESSAGES.DURATION,
                });
                return false;
            }

            const { location } = useLocation;
            updateUser({ ...auth });
            setAccessToken(auth.access_token);
            setUserInfo(
                auth.id,
                auth.role === DEFAULT_ROLES[ADMIN_ROLE],
                auth.role,
                auth.isPremium,
            );
            history.push(location);
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
        const { location } = useLocation;
        updateUser();
        clearAccessToken();
        notification.success({
            message: MESSAGES.LABELS.SUCCESS,
            description: MESSAGES.AUTHENTICATION.LOGOUT_SUCCESS,
            duration: MESSAGES.DURATION,
        });
        setAuthLoading(false);
        history.push(location);
    };

    const authContext = {
        authenticated,
        accessToken,
        userId,
        isAdmin,
        role,
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
