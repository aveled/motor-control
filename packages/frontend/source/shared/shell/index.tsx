// #region imports
    // #region libraries
    import React, {
        useEffect,
    } from 'react';

    import {
        AnyAction,
        ThunkDispatch,
    } from '@reduxjs/toolkit';
    import { connect } from 'react-redux';


    import {
        PluridReactComponent,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        getLanguage,
    } from '~kernel-services/logic';

    import Toolbar from '~kernel-components/Toolbar';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    // import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        GlobalStyle,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ShellOwnProperties {
    children?: React.ReactNode;
}

export interface ShellStateProperties {
}

export interface ShellDispatchProperties {
    dispatchSetLanguage: any;
}

export type ShellProperties =
    & ShellOwnProperties
    & ShellStateProperties
    & ShellDispatchProperties;


const Shell: React.FC<ShellProperties> = (
    properties,
) => {
    // #region properties
    const {
        children,

        // #region dispatch
        dispatchSetLanguage,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region effects
    useEffect(() => {
        const language = getLanguage();
        if (language) {
            dispatchSetLanguage(language);
        }
    }, []);
    // #endregion effects


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


const mapStateToProperties = (
    state: AppState,
): ShellStateProperties => ({
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ShellDispatchProperties => ({
    dispatchSetLanguage: (
        payload: any,
    ) => dispatch(
        actions.configuration.setLanguage(payload),
    ),
});


const ConnectedShell = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Shell);

const shell: PluridReactComponent = ConnectedShell;
// #endregion module



// #region exports
export default shell;
// #endregion exports
