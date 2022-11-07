// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const setGeneralView = (
    state: Types.State,
    action: Types.SetGeneralViewAction,
): Types.State => {
    return {
        ...state,
        general: action.payload,
    };
}



const resolvers = {
    setGeneralView,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
