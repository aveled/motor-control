// #region imports
    // #region external
    import modules from '../modules';
    // #endregion external
// #endregion imports



// #region module
const selectors = {
    general: modules.general.selectors,
    notifications: modules.notifications.selectors,
    owner: modules.owner.selectors,
    product: modules.product.selectors,
    configuration: modules.configuration.selectors,
    sitting: modules.sitting.selectors,
    themes: modules.themes.selectors,
    views: modules.views.selectors,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
