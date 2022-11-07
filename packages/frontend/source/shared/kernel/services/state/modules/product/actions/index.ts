// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion externalr
// #endregion imports



// #region module
const setProduct = (
    product: any,
): Types.SetProductAction => {
    return {
        type: Types.SET_PRODUCT,
        payload: product,
    };
}


const unsetProduct = (): Types.UnsetProductAction => {
    return {
        type: Types.UNSET_PRODUCT,
    };
}


const toggleProductUIToolbarsShowToolbar = (
    payload?: boolean,
): Types.ToggleProductUIToolbarsShowToolbarAction => {
    return {
        type: Types.TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_TOOLBAR,
        payload,
    };
}


const toggleProductUIToolbarsShowNames = (
    payload?: boolean,
): Types.ToggleProductUIToolbarsShowNamesAction => {
    return {
        type: Types.TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_NAMES,
        payload,
    };
}


const toggleProductUIToolbarsScaleIcons = (
    payload?: boolean,
): Types.ToggleProductUIToolbarsScaleIconsAction => {
    return {
        type: Types.TOGGLE_PRODUCT_UI_TOOLBARS_SCALE_ICONS,
        payload,
    };
}



const actions = {
    setProduct,
    unsetProduct,
    toggleProductUIToolbarsShowToolbar,
    toggleProductUIToolbarsShowNames,
    toggleProductUIToolbarsScaleIcons,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
