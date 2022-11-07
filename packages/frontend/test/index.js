require('dotenv').config({
    path: './environment/.env.local',
});

const MotorControlFrontend = require('../build');



MotorControlFrontend({
    endpoint: 'http://localhost:34500',
});
