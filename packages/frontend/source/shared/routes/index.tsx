// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridReactRoute,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import Home from '~kernel-containers/Home';
    import NotFoundPlane from '../kernel/planes/NotFound';

    import Settings from '~kernel-containers/Settings';

    import Head from '../kernel/components/Head';
    // #endregion external
// #endregion imports



// #region module
const indexRoute: PluridReactRoute = {
    value: '/',
    exterior: Home,
};


const settingsRoute: PluridReactRoute = {
    value: '/settings',
    exterior: Settings,
};


const notFoundRoute: PluridReactRoute = {
    value: '/not-found',
    exterior: () => (
        <Head
            title="Not Found"
        />
    ),
    planes: [
        [ '/not-found', NotFoundPlane ],
    ],
    view: [
        '/not-found',
    ],
};


const routes: PluridReactRoute[] = [
    indexRoute,
    settingsRoute,
    notFoundRoute,
];
// #endregion module



// #region exports
export default routes;
// #endregion exports
