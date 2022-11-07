// #region imports
    // #region external
    import modules from '../modules';
    // #endregion external
// #endregion imports



// #region module
const actions = {
    general: modules.general.actions,
    notifications: modules.notifications.actions,
    owner: modules.owner.actions,
    product: modules.product.actions,
    configuration: modules.configuration.actions,
    sitting: modules.sitting.actions,
    themes: modules.themes.actions,
    views: modules.views.actions,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
