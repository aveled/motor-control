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
    // #endregion libraries


    // #region external
    import {
        PluridSpinner,
        StyledPluridPureButton,
        PluridFormLeftRight,
        PluridDropdown,
        PluridInputLine,
    } from '~kernel-services/styled';

    import {
        setLanguage as setLanguageLogic,
        getLanguage,
        setToken as setTokenLogic,
        getToken,
        restartServer,
    } from '~kernel-services/logic';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledSettings,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface SettingsOwnProperties {
}

export interface SettingsStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateConfigurationEndpoint: string;
}

export interface SettingsDispatchProperties {
}

export type SettingsProperties =
    & SettingsOwnProperties
    & SettingsStateProperties
    & SettingsDispatchProperties;


const Settings: React.FC<SettingsProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        stateConfigurationEndpoint,
        // #endregion state
    } = properties;
    // #endregion properties


    // #region state
    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        language,
        setLanguage,
    ] = useState('english');

    const [
        token,
        setToken,
    ] = useState(getToken());
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


    // #region effects


    // #region effects
    useEffect(() => {
        const language = getLanguage();
        if (language) {
            setLanguage(language);
        }

        const token = getToken();
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        setLanguageLogic(language);
    }, [
        language,
    ]);

    useEffect(() => {
        if (token === '') {
            setTokenLogic('');
            return;
        }
    }, [
        token,
    ]);
    // #endregion effects


    // #region render
    if (loading) {
        return (
            <StyledSettings
                theme={stateGeneralTheme}
            >
                <PluridSpinner
                    theme={stateGeneralTheme}
                />
            </StyledSettings>
        );
    }

    return (
        <StyledSettings
            theme={stateGeneralTheme}
        >
            <h1>
                settings
            </h1>

            <PluridFormLeftRight
                style={{
                    marginBottom: '2rem',
                }}
            >
                <div>
                    language
                </div>

                <PluridDropdown
                    selected={language}
                    selectables={[
                        'english',
                    ]}
                    atSelect={(selection) => {
                        if (typeof selection === 'string') {
                            setLanguage(selection);
                        }
                    }}
                    theme={stateGeneralTheme}
                    width={90}
                />
            </PluridFormLeftRight>

            <PluridInputLine
                name="token"
                text={token}
                atChange={(event) => {
                    setToken(event.target.value);
                }}
                textline={{
                    enterAtClick: () => {
                        setTokenLogic(token);
                    },
                }}
                theme={stateGeneralTheme}
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
        </StyledSettings>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): SettingsStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateConfigurationEndpoint: selectors.configuration.getConfiguration(state).endpoint,
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): SettingsDispatchProperties => ({
});


const ConnectedSettings = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Settings);
// #endregion module



// #region exports
export default ConnectedSettings;
// #endregion exports
