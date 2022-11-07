// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridReactComponent,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import Toolbar from '~kernel-components/Toolbar';
    // #endregion external


    // #region internal
    import {
        GlobalStyle,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ShellProperties {
    children?: React.ReactNode;
}


const Shell: React.FC<ShellProperties> = (
    properties,
) => {
    // #region properties
    const {
        children,
    } = properties;
    // #endregion properties


    // #region render
    return (
        <>
            <GlobalStyle />

            <Toolbar />

            {children}
        </>
    );
    // #endregion render
}


const shell: PluridReactComponent = Shell;
// #endregion module



// #region exports
export default shell;
// #endregion exports
