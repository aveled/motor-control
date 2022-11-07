// #region imports
    // #region internal
    import {
        MotorControlOptions,
    } from '~data/interfaces';

    import MotorControl from './objects/MotorControl';
    // #endregion internal
// #endregion imports



// #region module
const MotorControlBackend = (
    configuration: MotorControlOptions,
) => {
    const motorControl = new MotorControl(configuration);

    return motorControl;
}
// #endregion module



// #region exports
export {
    MotorControl,
};

export default MotorControlBackend;
// #endregion exports
