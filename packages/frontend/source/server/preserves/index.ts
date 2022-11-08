// #region imports
    // #region libraries
    import express from 'express';

    import fetch from 'cross-fetch';

    import themes from '@plurid/plurid-themes';

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
        languageMap,
    } from '~kernel-data/constants';

    import {
        getRandomFace,
    } from '~kernel-planes/NotFound/logic';

    import reduxStore from '~kernel-services/state/store';
    // #endregion external
// #endregion imports



// #region module
const getConfiguration = async (
    endpoint: string,
) => {
    try {
        const {
            meta,
            motors,
        } = await (await fetch(endpoint + '/configuration')).json();

        return {
            meta,
            motors,
        };
    } catch (error) {
        return {
            meta: {},
            motors: {},
        };
    }
}


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
            } = await getConfiguration(configuration.endpoint);

            const stateThemes = meta.theme
                ? {
                    general: themes[meta.theme],
                    interaction: themes[meta.theme],
                } : undefined;

            const store = reduxStore({
                general: {
                    notFoundFace: getRandomFace(),
                },
                configuration: {
                    endpoint: configuration.endpoint,
                    meta: {
                        ...meta,
                        language: meta.language
                            ? languageMap[meta.language]
                            : undefined,
                    },
                    motors,
                },
                themes: stateThemes,
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
