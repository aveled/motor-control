// #region imports
    // #region libraries
    import React from 'react';

    import {
        hydrateRoot,
    } from 'react-dom/client';
    // #endregion libraries


    // #region external
    import {
        APPLICATION_ROOT,
    } from '~shared/data/constants';
    // #endregion external


    // #region internal
    import Client from './Client';
    // #endregion internal
// #endregion imports



// #region module
const pluridApp = document.getElementById(APPLICATION_ROOT)!;

hydrateRoot(
    pluridApp,
    <Client />,
);
// #endregion module
