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


    import themes, {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridReactComponent,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        getLanguage,
        getTheme,
    } from '~kernel-services/logic';

    import Head from '~kernel-components/Head';
    import Toolbar from '~kernel-components/Toolbar';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        GlobalStyle,
    } from './styled';

    import './index.css';
    // #endregion internal
// #endregion imports



// #region module
export interface ShellOwnProperties {
    children?: React.ReactNode;
}

export interface ShellStateProperties {
    stateGeneralTheme: Theme;
}

export interface ShellDispatchProperties {
    dispatchSetGeneralView: typeof actions.views.setGeneralView;
    dispatchSetLanguage: any;
    dispatchSetGeneralTheme: any;
    dispatchSetInteractionTheme: any;
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
        // #region own§
        children,
        // #endregion own§

        // #region state
        stateGeneralTheme,
        // #endregion state

        // #region dispatch
        dispatchSetGeneralView,
        dispatchSetLanguage,
        dispatchSetGeneralTheme,
        dispatchSetInteractionTheme,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region effects
    useEffect(() => {
        dispatchSetGeneralView(window.location.pathname);

        const language = getLanguage();
        if (language) {
            dispatchSetLanguage(language);
        }

        const theme = getTheme();
        if (theme) {
            dispatchSetGeneralTheme(themes[theme]);
            dispatchSetInteractionTheme(themes[theme]);
        }
    }, []);
    // #endregion effects


    // #region render
    return (
        <>
            <Head />

            <GlobalStyle
                theme={stateGeneralTheme}
            />

            <Toolbar />

            {children}
        </>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ShellStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ShellDispatchProperties => ({
    dispatchSetGeneralView: (
        view,
    ) => dispatch(
        actions.views.setGeneralView(view),
    ),
    dispatchSetLanguage: (
        payload: any,
    ) => dispatch(
        actions.configuration.setLanguage(payload),
    ),
    dispatchSetGeneralTheme: (
        payload: any,
    ) => dispatch(
        actions.themes.setGeneralTheme(payload),
    ),
    dispatchSetInteractionTheme: (
        payload: any,
    ) => dispatch(
        actions.themes.setInteractionTheme(payload),
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
