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


    import themes, {
        Theme,
    } from '@plurid/plurid-themes';

    // import {
    //     DispatchAction,
    // } from '@plurid/plurid-ui-state-react';
    // #endregion libraries


    // #region external
    import {
        themeNames,
        languages,
    } from '~kernel-data/constants';

    import {
        Language,
    } from '~kernel-data/interfaces';

    import {
        PluridSpinner,
        StyledPluridPureButton,
        StyledPluridFormLeftRight,
        PluridDropdown,
        PluridInputLine,
    } from '~kernel-services/styled';

    import {
        setTheme as setThemeLogic,
        setLanguage as setLanguageLogic,
        setToken as setTokenLogic,
        getToken,
        restartServer,
    } from '~kernel-services/logic';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
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
    stateConfigurationLanguage: Language;
}

export interface SettingsDispatchProperties {
    // dispatchSetLanguage: DispatchAction<typeof actions.configuration.setLanguage>;
    dispatchSetGeneralTheme: any;
    dispatchSetInteractionTheme: any;
    dispatchSetLanguage: any;
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
        stateConfigurationLanguage,
        // #endregion state

        // #region dispatch
        dispatchSetLanguage,
        dispatchSetGeneralTheme,
        dispatchSetInteractionTheme,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
    const [
        loading,
        setLoading,
    ] = useState(false);

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
    useEffect(() => {
        const token = getToken();
        if (token) {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        setTokenLogic(token);
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

    const ThemeSelector = (
        <StyledPluridFormLeftRight>
            <div>
                {languages[stateConfigurationLanguage].theme}
            </div>

            <PluridDropdown
                selected={stateGeneralTheme.name}
                selectables={[
                    ...themeNames,
                ]}
                atSelect={(selection) => {
                    if (typeof selection === 'string') {
                        dispatchSetGeneralTheme(themes[selection]);
                        dispatchSetInteractionTheme(themes[selection]);
                        setThemeLogic(selection);
                    }
                }}
                theme={stateGeneralTheme}
                width={90}
                filterable={true}
                heightItems={5}
            />
        </StyledPluridFormLeftRight>
    );

    const LanguageSelector = (
        <StyledPluridFormLeftRight>
            <div>
                {languages[stateConfigurationLanguage].language}
            </div>

            <PluridDropdown
                selected={stateConfigurationLanguage}
                selectables={[
                    ...Object.keys(languages).sort(),
                ]}
                atSelect={(selection) => {
                    if (typeof selection === 'string') {
                        dispatchSetLanguage(selection);
                        setLanguageLogic(selection);
                    }
                }}
                theme={stateGeneralTheme}
                width={90}
            />
        </StyledPluridFormLeftRight>
    );

    const TokenInput = (
        <PluridInputLine
            name={languages[stateConfigurationLanguage].token}
            text={token}
            atChange={(event) => {
                setToken(event.target.value);
            }}
            theme={stateGeneralTheme}
            style={{
                width: '280px',
            }}
        />
    );

    const RestartButton = (
        <StyledPluridPureButton
            text={languages[stateConfigurationLanguage].restart}
            atClick={() => {
                restart();
            }}
            theme={stateGeneralTheme}
            style={{
                marginTop: '4rem',
            }}
        />
    );

    return (
        <StyledSettings
            theme={stateGeneralTheme}
        >
            <h1>
                {languages[stateConfigurationLanguage].settings}
            </h1>

            {ThemeSelector}
            {LanguageSelector}
            {TokenInput}
            {RestartButton}
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
    stateConfigurationLanguage: selectors.configuration.getConfiguration(state).meta?.language || 'english',
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): SettingsDispatchProperties => ({
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
    dispatchSetLanguage: (
        payload: any,
    ) => dispatch(
        actions.configuration.setLanguage(payload),
    ),
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
