// #region imports
    // #region libraries
    import {
        createSlice,
        PayloadAction,
    } from '@reduxjs/toolkit';
    // #endregion libraries


    // #region external
    import type {
        AppState,
    } from '~kernel-services/state/store';
    // #endregion external
// #endregion imports



// #region module
export type OwnerState = {
    identonym: string;
}

export const initialState: OwnerState = {
    identonym: '',
};


export interface SetOwnerFieldPayload<T = any> {
    field: keyof OwnerState;
    value: T;
}


export const owner = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwner: (
            state,
            action: PayloadAction<any>,
        ) => {
            const {
                payload,
            } = action;

            return payload;
        },
        unsetOwner: (
            _state,
            _action,
        ) => {
            return initialState;
        },
        setOwnerField: (
            state,
            action: PayloadAction<SetOwnerFieldPayload>,
        ) => {
            const {
                field,
                value,
            } = action.payload;

            (state as any)[field] = value;
        },
    },
});
// #endregion module



// #region exports
export const actions = owner.actions;


const getOwner = (state: AppState) => state.owner;

const getIdentonym = (state: AppState) => state.owner.identonym;


export const selectors = {
    getOwner,
    getIdentonym,
};


export const reducer = owner.reducer;
// #endregion exports
