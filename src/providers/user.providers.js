import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { ADMIN_ROLE, DEFAULT_ROLES } from '../utils/roles.utils';

const initialState = {
    userDetails: null,
    role: 1,
    isPremium: false,
    isAdmin: false,
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ ...initialState });

    const updateUser = (data) => {
        if (data) {
            setUser({
                userDetails: { ...data },
                role: data.role,
                isPremium: data.isPremium,
                isAdmin: data.role === DEFAULT_ROLES[ADMIN_ROLE],
            });
        } else {
            setUser({ ...initialState });
        }
    };

    const userContext = {
        user,
        updateUser,
    };

    return <UserContext.Provider value={{ ...userContext }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const UserContext = createContext({});

export const useUserInfo = () => useContext(UserContext);
