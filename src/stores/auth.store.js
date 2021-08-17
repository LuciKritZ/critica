import create from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_ROLES, USER_ROLE, DEFAULT_ROLES_ARRAY } from '../utils/roles.utils';

const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

// App store for authentication, persisted in browser local storage
const useAuthStore = create(
    persist(
        (set) => ({
            authenticated: false,
            accessToken: '',
            redirectPath: '',
            userId: 0,
            isAdmin: false,
            role: DEFAULT_ROLES[USER_ROLE],
            isPremium: false,

            setUserInfo: (userCode, isAdmin, role, isPremiumUser = false) => {
                set({
                    userId: userCode || DEFAULT_EMPLOYEE_ID,
                    isAdmin: isAdmin || false,
                    role: DEFAULT_ROLES_ARRAY[role + 1],
                    isPremium: isPremiumUser,
                });
            },

            setAccessToken: (accessToken) => {
                set({
                    authenticated: Boolean(accessToken),
                    accessToken: accessToken || '',
                });
            },

            clearAccessToken: () => {
                set({
                    authenticated: false,
                    accessToken: '',
                    role: 1,
                    isAdmin: false,
                    isPremium: false,
                });
            },

            setRedirectPath: (path) => {
                set({
                    redirectPath: path,
                });
            },

            clearRedirectPath: () => {
                set({
                    redirectPath: '',
                });
            },
        }),
        {
            name: IS_AUTHENTICATED, // Persist in browser local storage
        },
    ),
);

export default useAuthStore;
