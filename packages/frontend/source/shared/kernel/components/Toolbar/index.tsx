// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';


    import {
        pluridRouterNavigate,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        languages,
    } from '~kernel-data/constants';

    import {
        Language,
    } from '~kernel-data/interfaces';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import actions from '~kernel-services/state/actions';
    import selectors from '~kernel-services/state/selectors';

    import {
        ToolbarGeneral as ToolbarGeneralComponent,
    } from '~kernel-services/styled';
    // #endregion external


    // #region internal
    import buttons from './data';
    // #endregion internal
// #endregion imports



// #region module
export interface ToolbarGeneralOwnProperties {
}

export interface ToolbarGeneralStateProperties {
    stateConfigurationLanguage: Language;
}

export interface ToolbarGeneralDispatchProperties {
    dispatchSetGeneralView: typeof actions.views.setGeneralView;
}

export type ToolbarGeneralProperties =
    & ToolbarGeneralOwnProperties
    & ToolbarGeneralStateProperties
    & ToolbarGeneralDispatchProperties;


const ToolbarGeneral: React.FC<ToolbarGeneralProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateConfigurationLanguage,
        // #endregion state

        // #region dispatch
        dispatchSetGeneralView,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleNavigation = (
        view: string,
    ) => {
        pluridRouterNavigate(view);
        dispatchSetGeneralView(view);
    }
    // #endregion handlers


    // #region render
    return (
        <ToolbarGeneralComponent
            buttons={buttons(languages[stateConfigurationLanguage])}
            selectors={selectors}
            context={StateContext}

            handleClick={handleNavigation}

            sittingButton={false}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ToolbarGeneralStateProperties => ({
    stateConfigurationLanguage: selectors.configuration.getConfiguration(state).meta?.language || 'english',
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ToolbarGeneralDispatchProperties => ({
    dispatchSetGeneralView: (
        view,
    ) => dispatch(
        actions.views.setGeneralView(view),
    ),
});


const ConnectedToolbarGeneral = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(ToolbarGeneral);
// #endregion module



// #region exports
export default ConnectedToolbarGeneral;
// #endregion exports
