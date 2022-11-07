// #region imports
    // #region external
    import * as general from '../modules/general';
    import * as configuration from '../modules/configuration';
    import * as themes from '../modules/themes';
    // #endregion external
// #endregion imports



// #region module
const actions = {
    general: general.actions,
    configuration: configuration.actions,
    themes: themes.actions,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
