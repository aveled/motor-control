// #region imports
    // #region external
    import * as Types from '../types';

    import initialState from '../initial';

    import resolvers from '../resolvers';
    // #endregion external
// #endregion imports



// #region module
const reducer = (
    state: Types.State = initialState,
    action: Types.Actions,
): Types.State => {
    switch(action.type) {
        case Types.SET_PRODUCT:
            return resolvers.setProduct(state, action);
        case Types.UNSET_PRODUCT:
            return resolvers.unsetProduct();
        case Types.TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_TOOLBAR:
            return resolvers.toggleProductUIToolbarsShowToolbar(state, action);
        case Types.TOGGLE_PRODUCT_UI_TOOLBARS_SHOW_NAMES:
            return resolvers.toggleProductUIToolbarsShowNames(state, action);
        case Types.TOGGLE_PRODUCT_UI_TOOLBARS_SCALE_ICONS:
            return resolvers.toggleProductUIToolbarsScaleIcons(state, action);
        default:
            return {
                ...state,
            };
    }
}
// #endregion module



// #region exports
export default reducer;
// #endregion exports
