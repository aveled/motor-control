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
// #endregion module
