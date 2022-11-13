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

    const resolveMotorID = () => {
        if (Object.keys(stateConfigurationMotors).length === 1) {
            return Object.keys(stateConfigurationMotors)[0];
        }

        if (stateConfigurationLanguage) {
            if (selectedMotor === languages[stateConfigurationLanguage].selectMotor) {
                return '';
            }
        }

        if (selectedMotor === SELECT_MOTOR) {
            return '';
        }

        return selectedMotor;
    }
    const motorID = resolveMotorID();

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
    ] = useState(0);
    const [
        running,
        setRunning,
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
            setRunning(true);
        } else {
            setRunning(false);
        }

        if (typeof state.speed === 'number' && !isNaN(state.speed)) {
            setSpeed(state.speed);
        }

        if (state.direction === 'left' || state.direction === 'right') {
            setSpinDirection(state.direction);
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        load();

        const interval = setInterval(
            load,
            10_000,
        );

        return () => {
            clearInterval(interval);
        }
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
                    setRunning(true);
                    break;
                case 'stop':
                    setRunning(false);
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

    const MotorStart = (
        <StyledPluridPureButton
            text={languages[stateConfigurationLanguage].start}
            atClick={() => {
                startMotor(stateConfigurationEndpoint);
                load();

                setRunning(true);
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

                setRunning(false);
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
            }}
            theme={stateGeneralTheme}
        />
    ) : (<></>);

    const MotorDirections = motor.directions ? (
        <StyledLeftRight>
            <StyledPluridPureButton
                text={`ᐊ ${languages[stateConfigurationLanguage].left}`}
                atClick={() => {
                    spinLeft(stateConfigurationEndpoint, duration);
                    setRunning(true);
                }}
                theme={stateGeneralTheme}
            />

            <StyledPluridPureButton
                text={`${languages[stateConfigurationLanguage].right} ᐅ`}
                atClick={() => {
                    spinRight(stateConfigurationEndpoint, duration);
                    setRunning(true);
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
            {running ? (
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
