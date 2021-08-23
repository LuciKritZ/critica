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
            email: '',
            role: DEFAULT_ROLES[USER_ROLE],
            isPremium: false,
            image: '',

            setUserInfo: (userCode, isAdmin, role, image, email, isPremiumUser = false) => {
                set({
                    userId: userCode,
                    isAdmin: isAdmin || false,
                    role: DEFAULT_ROLES_ARRAY[+role - 1],
                    image: image.toString().replace('=s96-c', ''),
                    email,
                    isPremium: isPremiumUser,
                });
            },

            setPremiumUser: (isPremiumUser) => {
                set({
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
                    email: '',
                    userId: null,
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
