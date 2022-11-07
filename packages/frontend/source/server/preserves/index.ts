// #region imports
    // #region libraries
    import express from 'express';

    import fetch from 'cross-fetch';

    import {
        PluridPreserve,
        PluridRouteMatch,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        MotorisConfiguration,
    } from '~shared/data/interfaces';

    import {
        getRandomFace,
    } from '~kernel-planes/NotFound/logic';

    import reduxStore from '~kernel-services/state/store';
    // #endregion external
// #endregion imports



// #region module
const preserves = (
    configuration: MotorisConfiguration,
): PluridPreserve<
    PluridRouteMatch | undefined,
    express.Request,
    express.Response
>[] => ([
    {
        serve: '*',
        onServe: async () => {
            const {
                meta,
                motors,
            } = await (await fetch(configuration.endpoint + '/configuration')).json();

            const store = reduxStore({
                general: {
                    notFoundFace: getRandomFace(),
                },
                configuration: {
                    endpoint: configuration.endpoint,
                    meta,
                    motors,
                },
            });

            return {
                providers: {
                    Redux: {
                        store,
                    },
                },
                globals: {
                    __PRELOADED_REDUX_STATE__: JSON.stringify(store.getState()),
                },
            };
        },
    },
]);
// #endregion module



// #region exports
export default preserves;
// #endregion exports
