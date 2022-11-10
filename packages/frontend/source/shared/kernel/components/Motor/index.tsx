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
        languages,
    } from '~kernel-data/constants';

    import {
        Language,
    } from '~kernel-data/interfaces';

    import {
        getStatus,
        startMotor,
        stopMotor,
        reverseMotor,
        spinLeft,
        spinRight,
        setFrequency,

        createEventSource,
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
    stateConfigurationLanguage: Language;
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
        stateConfigurationLanguage,
        // #endregion state
    } = properties;

    const motorID = Object.keys(stateConfigurationMotors).length === 1
        ? Object.keys(stateConfigurationMotors)[0]
        : selectedMotor === SELECT_MOTOR
            ? '' : selectedMotor;

    const motor = stateConfigurationMotors[motorID];

    const duration = motor && motor.directions && typeof motor.directions !== 'boolean'
        ? motor.directions.duration
        : undefined
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

    const [
        frequencySliderWidth,
        setFrequencySliderWidth,
    ] = useState(160);
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

        // const interval = setInterval(
        //     load,
        //     5_000,
        // );

        // return () => {
        //     clearInterval(interval);
        // }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setFrequencySliderWidth(220);
        }
    }, []);

    useEffect(() => {
        if (!motor) {
            return;
        }

        const eventSource = createEventSource(stateConfigurationEndpoint);

        const handleEvent = (
            event: MessageEvent,
        ) => {
            const data = JSON.parse(event.data);
            if (data.motorID !== motorID) {
                return;
            }

            switch (data.type) {
                case 'start':
                    setSpinning(true);
                    break;
                case 'stop':
                    setSpinning(false);
                    break;
            }
        }

        eventSource.addEventListener('message', handleEvent);

        return () => {
            eventSource.removeEventListener('message', handleEvent);
        }
    }, [
        motorID,
        motor,
    ]);

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
                    style={{
                        top: '53%',
                    }}
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
            text={languages[stateConfigurationLanguage].start}
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
            text={languages[stateConfigurationLanguage].stop}
            atClick={() => {
                stopMotor(stateConfigurationEndpoint);
                load();

                setSpinning(false);
                setStateChange(true);
            }}
            theme={stateGeneralTheme}
            style={{
                minWidth: '260px',
            }}
        />
    );

    const MotorReverse = motor.reverse ? (
        <StyledPluridPureButton
            text={languages[stateConfigurationLanguage].reverse}
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
                text={`ᐊ ${languages[stateConfigurationLanguage].left}`}
                atClick={() => {
                    setShortStateChange(true);
                    spinLeft(stateConfigurationEndpoint, duration);
                }}
                theme={stateGeneralTheme}
            />

            <StyledPluridPureButton
                text={`${languages[stateConfigurationLanguage].right} ᐅ`}
                atClick={() => {
                    setShortStateChange(true);
                    spinRight(stateConfigurationEndpoint, duration);
                }}
                theme={stateGeneralTheme}
            />
        </StyledLeftRight>
    ) : (<></>);

    const MotorFrequency = motor.frequency && motor.frequencyRange ? (
        <StyledLeftRight>
            <StyledText
                style={{
                    fontSize: '1.3rem',
                }}
            >
                {languages[stateConfigurationLanguage].speed}
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
                width={frequencySliderWidth}
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
    stateConfigurationLanguage: selectors.configuration.getConfiguration(state).meta?.language || 'english',
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
