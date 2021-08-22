import React, { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ADMIN_ROLE, CRITIC_ROLE, DEFAULT_ROLES } from '../utils/roles.utils';
import { useAuth } from './auth-provider.providers';
import { getUser } from '../rest/user.rest';

export const UserProvider = ({ children }) => {
    const { authenticated, email } = useAuth();
    const [user, setUser] = useState({
        userDetails: null,
        role: null,
        isPremium: false,
        isAdmin: false,
        isCritic: false,
    });

    const refreshUser = async () => {
        if (authenticated) {
            const userData = await getUser({
                email,
            });
            setUser({
                userDetails: { ...userData },
                role: userData.role,
                isPremium: userData.isPremium,
                isAdmin: userData.role === DEFAULT_ROLES[ADMIN_ROLE],
                isCritic: userData.role === DEFAULT_ROLES[CRITIC_ROLE],
            });
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const userContext = {
        user,
        refreshUser,
    };

    return <UserContext.Provider value={{ ...userContext }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const UserContext = createContext({});

export const useUserInfo = () => useContext(UserContext);
