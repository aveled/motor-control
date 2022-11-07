// #region imports
    // #region libraries
    import {
        ToolbarButton,
    } from '@plurid/plurid-ui-components-react';

    import {
        PluridIconSpace,
        PluridIconSettings,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        languages,
    } from '~kernel-data/constants';
    // #endregion external
// #endregion imports



// #region module
const buttons = (
    language: typeof languages['english'],
) => [
    {
        type: '/',
        text: language.motors,
        icon: PluridIconSpace,
        first: true,
    },
    {
        type: '/settings',
        text: language.settings,
        icon: PluridIconSettings,
        last: true,
    },
] as ToolbarButton[];
// #endregion module



// #region exports
export default buttons;
// #endregion exports
