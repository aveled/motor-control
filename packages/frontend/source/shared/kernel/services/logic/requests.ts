// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region internal
    import {
        getToken,
    } from './localStorage';
    // #endregion internal
// #endregion imports



// #region module
export const composeServerEndpoint = (
    endpoint: string,
    path: string,
    query?: string,
) => {
    const token = getToken();
    const tokenQuery = token ? `token=${token}` : '';
    const queryText = query || '';

    const querySign = tokenQuery || query ? '?' : '';
    const queryAnd = token && query ? '&' : '';

    return endpoint + path + querySign + tokenQuery + queryAnd + queryText;
}



export const startMotor = (
    serverEndpoint: string,
) => {
    try {
        fetch(composeServerEndpoint(serverEndpoint, '/start'), {
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
        fetch(composeServerEndpoint(serverEndpoint, '/restart'), {
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
        fetch(composeServerEndpoint(serverEndpoint, '/stop'), {
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
        fetch(composeServerEndpoint(serverEndpoint, '/reverse'), {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}


export const spinLeft = (
    serverEndpoint: string,
    duration?: number,
) => {
    try {
        fetch(composeServerEndpoint(
            serverEndpoint,
            '/left',
            typeof duration === 'number' ? `duration=${duration}` : '',
        ), {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}


export const spinRight = (
    serverEndpoint: string,
    duration?: number,
) => {
    try {
        fetch(composeServerEndpoint(
            serverEndpoint,
            '/right',
            typeof duration === 'number' ? `duration=${duration}` : '',
        ), {
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
        fetch(composeServerEndpoint(serverEndpoint, '/frequency'), {
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
        const request = await fetch(composeServerEndpoint(serverEndpoint, '/status'));
        const data = await request.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}
// #endregion module
