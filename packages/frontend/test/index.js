require('dotenv').config({
    path: './environment/.env.local',
});

const generateServer = require('../build');



const configuration = {
    endpoint: 'http://localhost:34500',
};

generateServer(configuration);
