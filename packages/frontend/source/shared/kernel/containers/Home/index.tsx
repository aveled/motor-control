// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
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
        languages,
        SELECT_MOTOR,
    } from '~kernel-data/constants';

    import {
        getSelectedMotor,
    } from '~kernel-services/logic';

    import Head from '~kernel-components/Head';

    import MotorSelector from '~kernel-components/MotorSelector';
    import Motor from '~kernel-components/Motor';

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
        stateConfigurationMeta,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region state
    const [
        selectedMotor,
        setSelectedMotor,
    ] = useState(stateConfigurationMeta?.language
        ? languages[stateConfigurationMeta.language].selectMotor
        : SELECT_MOTOR
    );
    // #endregion state


    // #region effects
    useEffect(() => {
        const selectedMotor = getSelectedMotor();
        if (selectedMotor) {
            setSelectedMotor(selectedMotor);
            return;
        }

        if (stateConfigurationMeta?.language) {
            setSelectedMotor(languages[stateConfigurationMeta.language].selectMotor);
        }
    }, [
        stateConfigurationMeta?.language,
    ]);
    // #endregion effects


    // #region render
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
        </StyledHome>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): HomeStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
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
