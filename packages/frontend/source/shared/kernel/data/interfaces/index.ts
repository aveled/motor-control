// #region imports
    // #region external
    import {
        languageMap,
    } from '~kernel-data/constants';
    // #endregion external
// #endregion imports



// #region module
export type AvailableLanguages = keyof typeof languageMap;
export type Language = typeof languageMap[keyof typeof languageMap];
// #endregion module
