// #region imports
    // #region libraries
    import {
        createSlice,
        PayloadAction,
    } from '@reduxjs/toolkit';
    // #endregion libraries


    // #region external
    import {
        MotorisMergedConfiguration,
    } from '~shared/data/interfaces';

    import {
        Language,
    } from '~kernel-data/interfaces';

    import {
        AppState,
    } from '~kernel-services/state/store';
    // #endregion external
// #endregion imports



// #region module
export type ConfigurationState = MotorisMergedConfiguration;


export const initialState: ConfigurationState = {
    endpoint: '',
    motors: {},
};

export const name = 'configuration' as const;


export const factory = (
    state: ConfigurationState = initialState,
) => createSlice({
    name,
    initialState: state,
    reducers: {
        setLanguage: (
            state,
            action: PayloadAction<Language>,
        ) => {
            if (state.meta) {
                state.meta.language = action.payload;
            }
        },
    },
});

export const slice = factory();
// #endregion module



// #region exports
export const actions = slice.actions;


const getConfiguration = (
    state: AppState,
) => state.configuration;

export const selectors = {
    getConfiguration,
};


export const reducer = slice.reducer;
// #endregion exports
