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
    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    // import actions from '~kernel-services/state/actions';
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
}

export interface ToolbarGeneralDispatchProperties {
}

export type ToolbarGeneralProperties =
    & ToolbarGeneralOwnProperties
    & ToolbarGeneralStateProperties
    & ToolbarGeneralDispatchProperties;


const ToolbarGeneral: React.FC<ToolbarGeneralProperties> = (
    properties,
) => {
    // #region properties
    // const {
    //     // #region dispatch
    //     // #endregion dispatch
    // } = properties;
    // #endregion properties


    // #region handlers
    const handleNavigation = (
        view: any,
    ) => {
        pluridRouterNavigate(view);
    }
    // #endregion handlers


    // #region render
    return (
        <ToolbarGeneralComponent
            buttons={buttons}
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
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ToolbarGeneralDispatchProperties => ({
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
