// #region imports
    // #region libraries
    import {
        night,
    } from '@plurid/plurid-themes';

    import {
        themes,
    } from '@plurid/plurid-ui-state-react';
    // #endregion libraries
// #endregion imports



// #region exports
const factory = themes.factory({
    general: night,
    interaction: night,
});


export const actions = factory.actions;


export const selectors = themes.selectors;


export const reducer = factory.reducer;
// #endregion exports
