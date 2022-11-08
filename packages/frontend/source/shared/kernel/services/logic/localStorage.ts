// #region module
const MOTOR_CONTROLS_SELECTED = 'motor-controls-selected';

export const setSelectedMotor = (
    value: string,
) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(MOTOR_CONTROLS_SELECTED, value);
}

export const getSelectedMotor = () => {
    if (typeof window === 'undefined') {
        return '';
    }

    const motor = window.localStorage.getItem(MOTOR_CONTROLS_SELECTED);

    return motor || '';
}


const MOTOR_CONTROLS_LANGUAGE = 'motor-controls-language';

export const setLanguage = (
    value: string,
) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(MOTOR_CONTROLS_LANGUAGE, value);
}

export const getLanguage = () => {
    if (typeof window === 'undefined') {
        return;
    }

    const language = window.localStorage.getItem(MOTOR_CONTROLS_LANGUAGE);

    return language;
}


const MOTOR_CONTROLS_THEME = 'motor-controls-theme';

export const setTheme = (
    value: string,
) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(MOTOR_CONTROLS_THEME, value);
}

export const getTheme = () => {
    if (typeof window === 'undefined') {
        return;
    }

    const language = window.localStorage.getItem(MOTOR_CONTROLS_THEME);

    return language;
}


const MOTOR_CONTROLS_TOKEN = 'motor-controls-token';

export const setToken = (
    value: string,
) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(MOTOR_CONTROLS_TOKEN, value);
}

export const getToken = () => {
    if (typeof window === 'undefined') {
        return '';
    }

    const token = window.localStorage.getItem(MOTOR_CONTROLS_TOKEN);

    return token || '';
}
// #endregion module
