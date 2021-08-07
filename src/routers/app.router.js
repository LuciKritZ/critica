import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoute } from '../utils/router.utils';

const Homepage = lazy(() => import('../pages/homepage/homepage.page'));
const Search = lazy(() => import('../pages/search/search.page'));
const Profile = lazy(() => import('../pages/my-profile/my-profile.page'));
const BookDetails = lazy(() => import('../pages/book-details/book-details.page'));
const MyBooks = lazy(() => import('../pages/my-books/my-books.page'));
const Bookmarks = lazy(() => import('../pages/bookmarks/bookmarks.page'));

const AppRouter = () => (
    <Suspense
        // Add loading indicator here.
        fallback={<div>Error.</div>}
    >
        <Switch>
            {/* Path for the homepage */}
            <Route path={AppRoute.HOMEPAGE} exact component={Homepage} />

            {/* Path for the search list */}
            <Route path={AppRoute.SEARCH} exact component={Search} />

            {/* Path for the user */}
            <Route path={AppRoute.PROFILE} exact component={Profile} />

            {/* Path for the getting the user details */}
            <Route path={AppRoute.USER_PROFILE} component={Profile} />

            {/* Path for the getting the book details */}
            <Route path={AppRoute.BOOK_DETAILS} component={BookDetails} />

            {/* Path for the getting the user's books */}
            <Route path={AppRoute.MY_BOOKS} component={MyBooks} />

            {/* Path for the getting the user bookmarks */}
            <Route path={AppRoute.BOOKMARKS} component={Bookmarks} />
        </Switch>
    </Suspense>
);

export default AppRouter;
Th;
