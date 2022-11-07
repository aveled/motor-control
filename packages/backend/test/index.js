const MotorControlBackend = require('../build').default;



MotorControlBackend({
    motors: {
        one: {
            poles: 2,
            registers: {
                start: 16,
                stop: 16,
                reverse: 16,
                readFrequency: 21,
                writeFrequency: 17,
            },
            values: {
                start: 3,
                stop: 0,
                reverse: 6,
                frequency: 450
            },
            directions: true,
            frequencyRange: {
                start: 300,
                end: 900,
                step: 150,
            },
        },
        two: {
            poles: 2,
            registers: {
                start: 16,
                stop: 16,
                reverse: 16,
                readFrequency: 21,
                writeFrequency: 17,
            },
            values: {
                start: 3,
                stop: 0,
                reverse: 6,
                frequency: 400,
            },
            directions: true,
        },
    },
    connections: {
        modbus: {
            type: 'modbusTCP',
            ip: '192.168.0.99',
            port: 502,
            id: 1,
        },
    },
    frontend: {
        title: '',
        favicon: '',
        pageTitle: '',
        pageIcon: '',
        theme: '',
    },
});
