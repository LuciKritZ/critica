const PLACEHOLDER_ID = ':id';

export const AppRoute = {
    HOMEPAGE: '/',
    SEARCH: '/search',
    PROFILE: '/profile',
    USER_PROFILE: `/profile/${PLACEHOLDER_ID}`,
    BOOK_DETAILS: `/books/${PLACEHOLDER_ID}`,
    MY_BOOKS: `/users/my-books`,
    BOOKMARKS: `/users/bookmarks`,
    ADMIN_PANEL: `/admin`,
    PAYMENT: `/payment`
};

export default AppRoute;
