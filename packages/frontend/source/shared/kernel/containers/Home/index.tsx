// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';


    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        MotorisMergedConfiguration
    } from '~shared/data/interfaces';

    import {
        SELECT_MOTOR,
    } from '~kernel-data/constants';

    import Head from '~kernel-components/Head';

    import MotorSelector from '~kernel-components/MotorSelector';
    import Motor from '~kernel-components/Motor';

    import {
        StyledPluridPureButton,
        PluridSpinner,
    } from '~kernel-services/styled';

    import {
        restartServer,
    } from '~kernel-services/logic';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledHome,
        StyledBranding,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface HomeOwnProperties {
}

export interface HomeStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateConfigurationEndpoint: string;
    stateConfigurationMeta: MotorisMergedConfiguration['meta'];
}

export interface HomeDispatchProperties {
}

export type HomeProperties = HomeOwnProperties
    & HomeStateProperties
    & HomeDispatchProperties;


const Home: React.FC<HomeProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        stateConfigurationEndpoint,
        stateConfigurationMeta,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region state
    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        selectedMotor,
        setSelectedMotor,
    ] = useState(SELECT_MOTOR);
    // #endregion state


    // #region handlers
    const restart = () => {
        restartServer(stateConfigurationEndpoint);
        setLoading(true);

        setTimeout(() => {
            location.reload();
        }, 1_200);
    }
    // #endregion handlers


    // #region render
    if (loading) {
        return (
            <StyledHome
                theme={stateGeneralTheme}
            >
                <PluridSpinner
                    theme={stateGeneralTheme}
                />
            </StyledHome>
        );
    }

    return (
        <StyledHome
            theme={stateGeneralTheme}
        >
            <Head />

            {stateConfigurationMeta &&
                <StyledBranding>
                    {stateConfigurationMeta.pageTitle && (
                        <h1>
                            {stateConfigurationMeta.pageTitle}
                        </h1>
                    )}

                    {stateConfigurationMeta.pageIcon && (
                        <img
                            src={stateConfigurationMeta.pageIcon}
                            alt={stateConfigurationMeta.pageTitle}
                        />
                    )}
                </StyledBranding>
            }

            <MotorSelector
                selectedMotor={selectedMotor}
                setSelectedMotor={setSelectedMotor}
            />

            <Motor
                selectedMotor={selectedMotor}
            />

            <StyledPluridPureButton
                text={'RESTART'}
                atClick={() => {
                    restart();
                }}
                theme={stateGeneralTheme}
                style={{
                    marginTop: '4rem',
                }}
            />
        </StyledHome>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): HomeStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateConfigurationEndpoint: selectors.configuration.getConfiguration(state).endpoint,
    stateConfigurationMeta: selectors.configuration.getConfiguration(state).meta,
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): HomeDispatchProperties => ({
});


const ConnectedHome = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Home);
// #endregion module



// #region exports
export default ConnectedHome;
// #endregion exports
