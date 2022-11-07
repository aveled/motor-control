// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        AnyAction,
        ThunkDispatch,
    } from '@reduxjs/toolkit';
    import { connect } from 'react-redux';


    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        useDebouncedCallback,
    } from '@plurid/plurid-functions-react';
    // #endregion libraries


    // #region external
    import {
        MotorisMergedConfiguration,
    } from '~shared/data/interfaces';

    import {
        SELECT_MOTOR,
    } from '~kernel-data/constants';

    import {
        getStatus,
        startMotor,
        stopMotor,
        reverseMotor,
        spinLeft,
        spinRight,
        setFrequency,
    } from '~kernel-services/logic';

    import {
        StyledPluridPureButton,
        PluridSlider,
        PluridSpinner,
    } from '~kernel-services/styled';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledMotor,
        StyledControls,
        StyledLeftRight,
        StyledText,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface MotorOwnProperties {
    selectedMotor: string;
}

export interface MotorStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateConfigurationEndpoint: string;
    stateConfigurationMotors: MotorisMergedConfiguration['motors'];
}

export interface MotorDispatchProperties {
}

export type MotorProperties =
    & MotorOwnProperties
    & MotorStateProperties
    & MotorDispatchProperties;


const Motor: React.FC<MotorProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        selectedMotor,
        // #endregion own

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        stateConfigurationEndpoint,
        stateConfigurationMotors,
        // #endregion state
    } = properties;

    const motorID = Object.keys(stateConfigurationMotors).length === 1
        ? Object.keys(stateConfigurationMotors)[0]
        : selectedMotor === SELECT_MOTOR
            ? '' : selectedMotor;

    const motor = stateConfigurationMotors[motorID];
    // #endregion properties


    // #region state
    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        spinDirection,
        setSpinDirection,
    ] = useState('left');
    const [
        speed,
        setSpeed,
    ] = useState(1);
    const [
        spinning,
        setSpinning,
    ] = useState(false);

    const [
        stateChange,
        setStateChange,
    ] = useState(false);

    const [
        shortStateChange,
        setShortStateChange,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const changeFrequency = useDebouncedCallback(
        (value: number) => {
            if (!motor.frequencyRange) {
                return;
            }

            setShortStateChange(true);

            const frequency = motor.frequencyRange[value];
            setFrequency(stateConfigurationEndpoint, frequency);
        },
        500,
    );

    const load = async () => {
        const state: any = await getStatus(stateConfigurationEndpoint);
        setTimeout(() => {
            setLoading(false);
        }, 300);

        if (!state) {
            return;
        }

        if (state.running) {
            setSpinning(true);
        } else {
            setSpinning(false);
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        load();

        const interval = setInterval(
            load,
            5_000,
        );

        return () => {
            clearInterval(interval);
        }
    }, []);

    // useEffect(() => {
    //     let timeout: NodeJS.Timeout | undefined;

    //     if (stateChange) {
    //         timeout = setTimeout(() => {
    //             setStateChange(false);
    //         }, 6_000);
    //     }

    //     return () => {
    //         if (timeout) {
    //             clearTimeout(timeout);
    //         }
    //     }
    // }, [
    //     stateChange,
    // ]);

    // useEffect(() => {
    //     let timeout: NodeJS.Timeout | undefined;

    //     if (shortStateChange) {
    //         timeout = setTimeout(() => {
    //             setShortStateChange(false);
    //         }, 3_000);
    //     }

    //     return () => {
    //         if (timeout) {
    //             clearTimeout(timeout);
    //         }
    //     }
    // }, [
    //     shortStateChange,
    // ]);
    // #endregion effects


    // #region render
    if (!motor) {
        return (<></>);
    }

    if (loading) {
        return (
            <StyledMotor
                theme={stateGeneralTheme}
            >
                <PluridSpinner
                    theme={stateGeneralTheme}
                />
            </StyledMotor>
        );
    }

    // if (stateChange || shortStateChange) {
    //     return (
    //         <StyledHome>
    //             <Head />

    //             <PluridSpinner
    //                 theme={stateGeneralTheme}
    //             />

    //             <StyledText
    //                 style={{
    //                     marginTop: '8rem',
    //                 }}
    //             >
    //                 changing state
    //             </StyledText>
    //         </StyledHome>
    //     );
    // }

    const MotorStart = (
        <StyledPluridPureButton
            text="START"
            atClick={() => {
                startMotor(stateConfigurationEndpoint);
                load();

                setSpinning(true);
                setStateChange(true);
            }}
            theme={stateGeneralTheme}
        />
    );

    const MotorStop = (
        <StyledPluridPureButton
            text="STOP"
            atClick={() => {
                stopMotor(stateConfigurationEndpoint);
                load();

                setSpinning(false);
                setStateChange(true);
            }}
            theme={stateGeneralTheme}
            style={{
                minWidth: '300px',
            }}
        />
    );

    const MotorReverse = motor.reverse ? (
        <StyledPluridPureButton
            text={'reverse'}
            atClick={() => {
                reverseMotor(stateConfigurationEndpoint);
                load();

                if (spinDirection === 'left') {
                    setSpinDirection('right');
                } else {
                    setSpinDirection('left');
                }

                setStateChange(true);
            }}
            theme={stateGeneralTheme}
        />
    ) : (<></>);

    const MotorDirections = motor.directions ? (
        <StyledLeftRight>
            <StyledPluridPureButton
                text="ᐊ left"
                atClick={() => {
                    setShortStateChange(true);
                    spinLeft(stateConfigurationEndpoint);
                }}
                theme={stateGeneralTheme}
            />

            <StyledPluridPureButton
                text="right ᐅ"
                atClick={() => {
                    setShortStateChange(true);
                    spinRight(stateConfigurationEndpoint);
                }}
                theme={stateGeneralTheme}
            />
        </StyledLeftRight>
    ) : (<></>);

    const MotorFrequency = motor.frequency && motor.frequencyRange ? (
        <StyledLeftRight>
            <StyledText
                style={{
                    fontSize: '1.4rem',
                }}
            >
                speed
            </StyledText>

            <PluridSlider
                value={speed}
                step={1}
                max={motor.frequencyRange.length - 1}
                atChange={(value) => {
                    setSpeed(value);

                    changeFrequency(value);
                }}
                theme={stateGeneralTheme}
                width={160}
            />
        </StyledLeftRight>
    ) : (<></>);

    return (
        <StyledMotor
            theme={stateGeneralTheme}
        >
            {spinning ? (
                <StyledControls>
                    {MotorStop}
                </StyledControls>
            ) : (
                <StyledControls>
                    {MotorStart}
                    {MotorReverse}
                    {MotorDirections}
                    {MotorFrequency}
                </StyledControls>
            )}
        </StyledMotor>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): MotorStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateConfigurationEndpoint: selectors.configuration.getConfiguration(state).endpoint,
    stateConfigurationMotors: selectors.configuration.getConfiguration(state).motors,
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): MotorDispatchProperties => ({
});


const ConnectedMotor = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Motor);
// #endregion module



// #region exports
export default ConnectedMotor;
// #endregion exports
