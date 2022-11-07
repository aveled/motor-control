// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getProduct = (state: AppState) => state.product;
const getProductUI = (state: AppState) => state.product.ui;



const selectors = {
    getProduct,
    getProductUI,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
