// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries
// #endregion imports



// #region module
export const startMotor = (
    serverEndpoint: string,
) => {
    try {
        fetch(serverEndpoint + '/start', {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}

export const restartServer = (
    serverEndpoint: string,
) => {
    try {
        fetch(serverEndpoint + '/restart', {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}

export const stopMotor = (
    serverEndpoint: string,
) => {
    try {
        fetch(serverEndpoint + '/stop', {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}

export const reverseMotor = (
    serverEndpoint: string,
) => {
    try {
        fetch(serverEndpoint + '/reverse', {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}


export const spinLeft = (
    serverEndpoint: string,
) => {
    try {
        fetch(serverEndpoint + '/left', {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}


export const spinRight = (
    serverEndpoint: string,
) => {
    try {
        fetch(serverEndpoint + '/right', {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}


export const setFrequency = (
    serverEndpoint: string,
    value: number,
) => {
    try {
        fetch(serverEndpoint + '/frequency', {
            method: 'POST',
            body: JSON.stringify({
                value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
}


export const getStatus = async (
    serverEndpoint: string,
) => {
    try {
        const request = await fetch(serverEndpoint + '/status');
        const data = await request.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}



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
        return 'english';
    }

    const language = window.localStorage.getItem(MOTOR_CONTROLS_LANGUAGE);

    return language || 'english';
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
