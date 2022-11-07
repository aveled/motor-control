// #region imports
    // #region external
    import * as Types from '../types';

    import initialState from '../initial';
    // #endregion external
// #endregion imports



// #region module
const setProduct = (
    state: Types.State,
    action: Types.SetProductAction,
): Types.State => {
    return {
        ...state,
        ...action.payload,
    };
}


const unsetProduct = (): Types.State => {
    return {
        ...initialState,
    };
}


const toggleProductUIToolbarsShowToolbar = (
    state: Types.State,
    action: Types.ToggleProductUIToolbarsShowToolbarAction,
): Types.State => {
    const {
        ui,
    } = state;

    const alwaysShow = typeof action.payload === 'boolean'
        ? action.payload
        : !ui.toolbars.alwaysShow;

    return {
        ...state,
        ui: {
            ...ui,
            toolbars: {
                ...ui.toolbars,
                alwaysShow,
            },
        },
    };
}


const toggleProductUIToolbarsShowNames = (
    state: Types.State,
    action: Types.ToggleProductUIToolbarsShowNamesAction,
): Types.State => {
    const {
        ui,
    } = state;

    const showNames = typeof action.payload === 'boolean'
        ? action.payload
        : !ui.toolbars.showNames;

    return {
        ...state,
        ui: {
            ...ui,
            toolbars: {
                ...ui.toolbars,
                showNames,
            },
        },
    };
}


const toggleProductUIToolbarsScaleIcons = (
    state: Types.State,
    action: Types.ToggleProductUIToolbarsScaleIconsAction,
): Types.State => {
    const {
        ui,
    } = state;

    const scaleIcons = typeof action.payload === 'boolean'
        ? action.payload
        : !ui.toolbars.scaleIcons;

    return {
        ...state,
        ui: {
            ...ui,
            toolbars: {
                ...ui.toolbars,
                scaleIcons,
            },
        },
    };
}



const resolvers = {
    setProduct,
    unsetProduct,
    toggleProductUIToolbarsShowToolbar,
    toggleProductUIToolbarsShowNames,
    toggleProductUIToolbarsScaleIcons,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
