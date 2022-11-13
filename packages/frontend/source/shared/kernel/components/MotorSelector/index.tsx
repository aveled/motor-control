// #region imports
    // #region libraries
    import React from 'react';

    import {
        AnyAction,
        ThunkDispatch,
    } from '@reduxjs/toolkit';
    import { connect } from 'react-redux';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        MotorisMergedConfiguration,
    } from '~shared/data/interfaces';

    import {
        SELECT_MOTOR,
        languages,
    } from '~kernel-data/constants';

    import {
        Language,
    } from '~kernel-data/interfaces';

    import {
        PluridDropdown,
    } from '~kernel-services/styled';

    import {
        setSelectedMotor as setSelectedMotorLogic,
    } from '~kernel-services/logic';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledMotorSelector,
        StyledMotorSign,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface MotorSelectorOwnProperties {
    selectedMotor: string;
    setSelectedMotor: React.Dispatch<React.SetStateAction<string>>;
}

export interface MotorSelectorStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateConfigurationMotors: MotorisMergedConfiguration['motors'];
    stateConfigurationLanguage: Language;
}

export interface MotorSelectorDispatchProperties {
}

export type MotorSelectorProperties =
    & MotorSelectorOwnProperties
    & MotorSelectorStateProperties
    & MotorSelectorDispatchProperties;


const MotorSelector: React.FC<MotorSelectorProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        selectedMotor,
        setSelectedMotor,
        // #endregion own

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        stateConfigurationMotors,
        stateConfigurationLanguage,
        // #endregion state
    } = properties;

    const motors = Object.entries(stateConfigurationMotors);
    // #endregion properties


    // #region handlers
    const isSelectedMotor = () => {
        if (selectedMotor === SELECT_MOTOR) {
            return true;
        }

        if (stateConfigurationLanguage) {
            if (selectedMotor === languages[stateConfigurationLanguage].selectMotor) {
                return true;
            }
        }

        return false;
    }
    // #endregion handlers


    // #region render
    if (motors.length === 0 || motors.length === 1) {
        return (<></>);
    }

    return (
        <StyledMotorSelector
            theme={stateGeneralTheme}
            style={{
                marginBottom: isSelectedMotor() ? '0' : '4rem',
            }}
        >
            <StyledMotorSign
                theme={stateGeneralTheme}
            >
                ⚡
            </StyledMotorSign>

            <PluridDropdown
                selected={selectedMotor}
                selectables={[
                    ...motors.map(motor => motor[0]),
                ]}
                atSelect={(selection) => {
                    if (typeof selection === 'string') {
                        setSelectedMotor(selection);
                        setSelectedMotorLogic(selection);
                    }
                }}
                selectAtHover={false}
                width={150}
                listTop={'40px'}
                theme={stateGeneralTheme}
                style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                }}
            />
        </StyledMotorSelector>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): MotorSelectorStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateConfigurationMotors: selectors.configuration.getConfiguration(state).motors,
    stateConfigurationLanguage: selectors.configuration.getConfiguration(state).meta?.language || 'english',
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): MotorSelectorDispatchProperties => ({
});


const ConnectedMotorSelector = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(MotorSelector);
// #endregion module



// #region exports
export default ConnectedMotorSelector;
// #endregion exports
