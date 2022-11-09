// #region imports
    // #region external
    import {
        composeServerEndpoint,
    } from './requests';
    // #endregion external
// #endregion imports



// #region methods
export const createEventSource = (
    endpoint: string,
) => {
    const eventSource = new EventSource(
        composeServerEndpoint(endpoint, '/events'),
        { withCredentials: true },
    );

    return eventSource;
}
// #endregion methods
