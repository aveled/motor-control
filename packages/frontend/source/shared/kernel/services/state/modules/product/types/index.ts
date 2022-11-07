// #region module
export const SET_PRODUCT = 'SET_PRODUCT';
export interface SetProductPayload {
    [key: string]: any;
}
export interface SetProductAction {
    type: typeof SET_PRODUCT;
    payload: SetProductPayload;
}

export const UNSET_PRODUCT = 'UNSET_PRODUCT';
export interface UnsetProductAction {
    type: typeof UNSET_PRODUCT;
}


export const TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_TOOLBAR = 'TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_TOOLBAR';
export interface ToggleProductUIToolbarsShowToolbarAction {
    type: typeof TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_TOOLBAR;
    payload?: boolean;
}


export const TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_NAMES = 'TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_NAMES';
export interface ToggleProductUIToolbarsShowNamesAction {
    type: typeof TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_NAMES;
    payload?: boolean;
}


export const TOGGLE_PRODUCT_UI_TOOLBARS_SCALE_ICONS = 'TOGGLE_PRODUCT_UI_TOOLBARS_SCALE_ICONS';
export interface ToggleProductUIToolbarsScaleIconsAction {
    type: typeof TOGGLE_PRODUCT_UI_TOOLBARS_SCALE_ICONS;
    payload?: boolean;
}




export interface State {
    ui: any;
    access: any;
}


export type Actions = SetProductAction
    | UnsetProductAction
    | ToggleProductUIToolbarsShowToolbarAction
    | ToggleProductUIToolbarsShowNamesAction
    | ToggleProductUIToolbarsScaleIconsAction;
// #endregion module
