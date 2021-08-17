import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useAuthStore from '../stores/auth.store';
import LoadingIndicator from '../components/loading-indicator/loading-indicator.component';
import { notification } from 'antd';
import MESSAGES from '../utils/messages.utils';

export const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
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

    const initAuth = () => {
        if (authenticated) {
            setAuthLoading(false);

            return;
        }

        setAuthLoading(false);
    };

    useEffect(() => {
        setAuthLoading(true);
        initAuth();
    }, []);

    const performLogin = async (formData) => {
        if (authenticated) {
            return true;
        }

        try {
            if (!formData || !formData.tokenId) {
                notification.error({
                    message: MESSAGES.LABELS.ERROR,
                    description: MESSAGES.AUTHENTICATION.ERROR,
                    duration: MESSAGES.DURATION,
                });
                return false;
            }

            setAccessToken(formData.tokenId);
            setUserInfo(1, false, formData.role || 1);
        } catch (error) {
            notification.error({
                message: MESSAGES.LABELS.ERROR,
                description: error.response.message,
                duration: MESSAGES.DURATION,
            });
            return false;
        }

        return true;
    };

    const authContext = {
        authenticated,
        accessToken,
        userId,
        isAdmin,
        role,
        signIn: performLogin,
        signOut: clearAccessToken,
    };

    if (authLoading) {
        return <LoadingIndicator />;
    }

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
