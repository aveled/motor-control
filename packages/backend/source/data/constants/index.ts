// #region module
export const TOKEN = process.env.MOTOR_CONTROL_TOKEN;
export const PORT = parseInt(process.env.MOTOR_CONTROL_BACKEND_PORT || '') || 34500;
export const TEST_MODE = process.env.MOTOR_CONTROL_TEST_MODE === 'true';
// #endregion module
