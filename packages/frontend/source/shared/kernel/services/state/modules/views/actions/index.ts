// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion externalr
// #endregion imports



// #region module
const setGeneralView = (
    view: string,
): Types.SetGeneralViewAction => {
    return {
        type: Types.SET_GENERAL_VIEW,
        payload: view,
    };
}


const actions = {
    setGeneralView,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
