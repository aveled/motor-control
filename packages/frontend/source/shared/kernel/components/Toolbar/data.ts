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
// #endregion imports



// #region module
const buttons: ToolbarButton[] = [
    {
        type: '/',
        text: 'motors',
        icon: PluridIconSpace,
        first: true,
    },
    {
        type: '/settings',
        text: 'settings',
        icon: PluridIconSettings,
        last: true,
    },
];
// #endregion module



// #region exports
export default buttons;
// #endregion exports
