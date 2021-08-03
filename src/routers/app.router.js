import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoute } from '../utils/router.utils';

const Homepage = lazy(() => import('../pages/homepage/homepage.component'));
const Search = lazy(() => import('../pages/search/search.component'));
const Profile = lazy(() => import('../pages/my-profile/my-profile.component'));

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
        </Switch>
    </Suspense>
);

export default AppRouter;
