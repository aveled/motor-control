// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';

    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const getGeneralView = (state: AppState): Types.State['general'] => state.views.general;


const selectors = {
    getGeneralView,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
