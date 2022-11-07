// #region module
export const SET_GENERAL_VIEW = 'SET_GENERAL_VIEW';
export interface SetGeneralViewAction {
    type: typeof SET_GENERAL_VIEW;
    payload: string;
}



export interface State {
    general: string;
}


export type Actions = SetGeneralViewAction;
// #endregion module
