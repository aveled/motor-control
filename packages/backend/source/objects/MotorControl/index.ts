// #region imports
    // #region libraries
    import {
        execSync,
    } from 'node:child_process';

    import type {
        Server,
    } from 'node:http';


    import express, {
        Express,
    } from 'express';

    import cors from 'cors';

    import {
        json,
    } from 'body-parser';
    // #endregion libraries


    // #region external
    import {
        MotorControlOptions,
        CommonRequestParameters,
        TimedRequestParameters,
        Motor,
        ResponseStatus,
    } from '~data/interfaces';

    import {
        PORT,
        TEST_MODE,
        TOKEN,
    } from '~data/constants';

    import ConnectionsManager from '../ConnectionsManager';
    // #endregion external
// #endregion imports



// #region module
class MotorControl {
    private options: MotorControlOptions;
    private app: Express;
    private server: Server | undefined;
    private connections: ConnectionsManager;

    private motorFrequencies: Record<string, number> = {};
    private motorState: Record<string, string> = {};

    private eventSubscribers: Record<string, express.Response> = {};


    constructor(
        options: MotorControlOptions,
    ) {
        this.options = options;
        this.checks();

        this.connections = new ConnectionsManager(this.options.connections);
        this.app = express();
        this.setup();
    }


    private checks() {
        if (!this.options?.motors || Object.values(this.options.motors).length === 0) {
            throw 'MotorControl requires at least one motor';
        }

        if (!this.options?.connections || Object.values(this.options.connections).length === 0) {
            throw 'MotorControl requires at least one connection';
        }
    }

    private setup() {
        this.app.use(
            cors({
                credentials: true,
                origin: (_: any, callback: any) => {
                    return callback(null, true);
                },
            }),
        );
        this.app.use(json());


        for (const [motorID, motorData] of Object.entries(this.options.motors)) {
            if (typeof motorData.values.frequency === 'number') {
                this.motorFrequencies[motorID] = motorData.values.frequency;
            }
        }


        const unpackMotors = () => {
            const motorsData = Object.entries(this.options.motors).map(motor => {
                const [motorID, motorData] = motor;

                const {
                    frequencyRange: frequencyRangeData,
                    registers,
                } = motorData;

                const {
                    reverse,
                    readFrequency,
                    writeFrequency,
                } = registers;

                function range(
                    start: number,
                    end: number,
                    step = 1,
                ) {
                    const length = Math.floor((end - start) / step) + 1;
                    return Array(length).fill(0).map((_, index) => start + (index * step))
                }
                const frequencyRange = frequencyRangeData
                    ? range(frequencyRangeData.start, frequencyRangeData.end, frequencyRangeData.step)
                    : undefined;

                return {
                    id: motorID,
                    reverse: typeof reverse === 'number',
                    frequency: typeof writeFrequency === 'number' && typeof readFrequency === 'number',
                    frequencyRange,
                    directions: !motorData.directions
                        ? false
                        : typeof motorData.directions === 'boolean'
                            ? motorData.directions
                            : {
                                duration: motorData.directions.duration || 5,
                            },
                };
            });

            const motors: Record<string, any> = {};
            for (const motor of motorsData) {
                const {
                    id,
                    reverse,
                    frequency,
                    frequencyRange,
                    directions,
                } = motor;

                motors[id] = {
                    reverse,
                    frequency,
                    frequencyRange,
                    directions,
                };
            }

            return motors;
        }

        const unpackMeta = () => {
            if (!this.options.frontend) {
                return;
            }

            const {
                title,
                favicon,
                pageTitle,
                pageIcon,
                theme,
                language,
            } = this.options.frontend;

            return {
                title,
                favicon,
                pageTitle,
                pageIcon,
                theme,
                language,
            };
        }


        const setState = (
            value: string,
            motorID: string,
        ) => {
            this.motorState[motorID] = value;

            setTimeout(() => {
                this.motorState[motorID] = '';
            }, 2_000);
        }

        const handler = (
            request: express.Request,
            response: express.Response,
            stateValue: string,
            logic: () => void,
        ) => {
            const {
                motor,
            } = request.query as CommonRequestParameters;

            if (typeof motor === 'string') {
                if (!this.options.motors[motor]) {
                    response.json({
                        status: false,
                    });
                    return;
                }
            }

            const {
                motorID,
            } = this.getMotor(motor);

            if (this.motorState[motorID]) {
                response.json({
                    status: false,
                    error: 'IN_STATE',
                });

                return;
            }

            setState(
                stateValue,
                motorID,
            );

            logic();

            response.json({
                status: true,
            });
        }

        const handleToken = (
            token: string | undefined,
        ): boolean => {
            if (!TOKEN) {
                /** Not using token for authorization */
                return true;
            }

            return token === TOKEN;
        }


        const handleFrequency = (
            motorID: string,
            motorData: Motor,
        ) => {
            if (typeof motorData.registers.writeFrequency !== 'number') {
                return;
            }

            if (typeof this.motorFrequencies[motorID] !== 'number') {
                return;
            }

            setTimeout(() => {
                this.connections.writeRegister(
                    motorData.registers.writeFrequency,
                    this.motorFrequencies[motorID],
                    motorData.connection,
                );
            }, 200);
        }

        const handleDuration = (
            duration: number | undefined,
            motorID: string,
            motorData: Motor,
        ) => {
            if (typeof duration === 'number' && duration) {
                setTimeout(() => {
                    this.connections.writeRegister(
                        motorData.registers.stop,
                        motorData.values.stop,
                        motorData.connection,
                    );

                    sendEvent({
                        type: 'stop',
                        motorID,
                    });
                }, duration * 1_000);
            }
        }

        const rpmToFrequency = (
            rpm: number,
            motorData: Motor,
        ) => {
            const frequency = rpm * motorData.poles / (2 * 60);

            return frequency;
        }

        const frequencyToRPM = (
            frequency: number | undefined,
            motorData: Motor,
        ) => {
            if (typeof frequency !== 'number') {
                return;
            }

            const rpm = frequency * 60 * 2 / motorData.poles;

            return rpm;
        }

        const speedFromFrequency = (
            frequency: number | undefined,
            motorID: string,
        ) => {
            const motors = unpackMotors();
            const motor = motors[motorID];
            if (!motor) {
                return;
            }

            if (!Array.isArray(motor.frequencyRange)) {
                return;
            }

            const speed = motor.frequencyRange.indexOf(frequency);
            return speed;
        }

        const sendEvent = (
            data: Record<string, any>,
        ) => {
            const eventString = JSON.stringify(data).replace(/\n/g, '\\n');

            for (const response of Object.values(this.eventSubscribers)) {
                const sseID = Math.random() + '';

                response.write('id: ' + sseID + '\n', 'utf-8');
                response.write('data: ' + eventString + '\n\n', 'utf-8');
            }
        }


        this.app.post('/start', (request, response) => {
            handler(
                request,
                response,
                'starting',
                () => {
                    const {
                        token,
                        motor,
                        duration,
                    } = this.parseTimedRequest(request);

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    this.connections.writeRegister(
                        motorData.registers.start,
                        motorData.values.start,
                        motorData.connection,
                    );

                    handleFrequency(motorID, motorData);
                    handleDuration(duration, motorID, motorData);

                    sendEvent({
                        type: 'start',
                        motorID,
                    });
                },
            );
        });

        this.app.post('/stop', (request, response) => {
            handler(
                request,
                response,
                'stopping',
                () => {
                    const {
                        token,
                        motor,
                    } = request.query as CommonRequestParameters;

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    this.connections.writeRegister(
                        motorData.registers.stop,
                        motorData.values.stop,
                        motorData.connection,
                    );

                    sendEvent({
                        type: 'stop',
                        motorID,
                    });
                },
            );
        });

        this.app.post('/reverse', (request, response) => {
            handler(
                request,
                response,
                'reversing',
                () => {
                    const {
                        token,
                        motor,
                        duration,
                    } = this.parseTimedRequest(request);

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    if (typeof motorData.registers.reverse !== 'number') {
                        return;
                    }

                    this.connections.writeRegister(
                        motorData.registers.reverse,
                        motorData.values.reverse,
                        motorData.connection,
                    );

                    handleFrequency(motorID, motorData);
                    handleDuration(duration, motorID, motorData);

                    sendEvent({
                        type: 'start',
                        motorID,
                    });
                },
            );
        });

        this.app.post('/left', (request, response) => {
            handler(
                request,
                response,
                'left',
                () => {
                    const {
                        token,
                        motor,
                        duration,
                    } = this.parseTimedRequest(request);

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    if (typeof motorData === 'boolean' && motorData === false) {
                        return;
                    }

                    const direction = motorData.directions && typeof motorData.directions !== 'boolean'
                        ? motorData.directions.left ? motorData.directions.left : 'start'
                        : 'start';

                    this.connections.writeRegister(
                        motorData.registers[direction],
                        motorData.values[direction],
                        motorData.connection,
                    );

                    handleFrequency(motorID, motorData);
                    handleDuration(duration, motorID, motorData);

                    sendEvent({
                        type: 'start',
                        motorID,
                    });
                },
            );
        });

        this.app.post('/right', (request, response) => {
            handler(
                request,
                response,
                'right',
                () => {
                    const {
                        token,
                        motor,
                        duration,
                    } = this.parseTimedRequest(request);

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    if (typeof motorData === 'boolean' && motorData === false) {
                        return;
                    }

                    const direction = motorData.directions && typeof motorData.directions !== 'boolean'
                        ? motorData.directions.right ? motorData.directions.right : 'reverse'
                        : 'reverse';

                    this.connections.writeRegister(
                        motorData.registers[direction],
                        motorData.values[direction],
                        motorData.connection,
                    );

                    handleFrequency(motorID, motorData);
                    handleDuration(duration, motorID, motorData);

                    sendEvent({
                        type: 'start',
                        motorID,
                    });
                },
            );
        });

        this.app.get('/frequency', (request, response) => {
            handler(
                request,
                response,
                'frequency',
                async () => {
                    const {
                        token,
                        motor,
                    } = request.query as CommonRequestParameters;

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    if (typeof motorData.registers.readFrequency !== 'number') {
                        return;
                    }

                    const frequency = await this.connections.readRegister(
                        motorData.registers.readFrequency,
                        motorData.connection,
                    );
                    if (typeof frequency !== 'number') {
                        return;
                    }
                },
            );
        });

        this.app.post('/frequency', (request, response) => {
            handler(
                request,
                response,
                'frequency',
                () => {
                    const frequency = request.body.value;
                    if (!frequency || typeof frequency !== 'number') {
                        return;
                    }

                    const {
                        token,
                        motor,
                    } = request.query as CommonRequestParameters;

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    if (typeof motorData.registers.writeFrequency !== 'number') {
                        return;
                    }

                    this.connections.writeRegister(
                        motorData.registers.writeFrequency,
                        frequency,
                        motorData.connection,
                    );

                    this.motorFrequencies[motorID] = frequency;
                },
            );
        });

        this.app.get('/rpm', (request, response) => {
            handler(
                request,
                response,
                'rpm',
                async () => {
                    const {
                        token,
                        motor,
                    } = request.query as CommonRequestParameters;

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    if (typeof motorData.registers.readFrequency !== 'number') {
                        return;
                    }

                    const frequency = await this.connections.readRegister(
                        motorData.registers.readFrequency,
                        motorData.connection,
                    );
                    if (typeof frequency !== 'number') {
                        return;
                    }
                },
            );
        });

        this.app.post('/rpm', (request, response) => {
            handler(
                request,
                response,
                'rpm',
                () => {
                    const rpm = request.body.value;
                    if (!rpm || typeof rpm !== 'number') {
                        return;
                    }

                    const {
                        token,
                        motor,
                    } = request.query as CommonRequestParameters;

                    const validRequest = handleToken(token);
                    if (!validRequest) {
                        return;
                    }

                    const {
                        motorID,
                        motorData,
                    } = this.getMotor(motor);
                    if (!motorData) {
                        return;
                    }

                    if (typeof motorData.registers.writeFrequency !== 'number') {
                        return;
                    }

                    const frequency = rpmToFrequency(rpm, motorData);
                    this.connections.writeRegister(
                        motorData.registers.writeFrequency,
                        frequency,
                        motorData.connection,
                    );
                },
            );
        });

        this.app.get('/status', async (request, response) => {
            const {
                token,
                motor,
            } = request.query as CommonRequestParameters;

            const validRequest = handleToken(token);
            if (!validRequest) {
                response.json({
                    status: false,
                });
                return;
            }

            const {
                motorID,
                motorData,
            } = this.getMotor(motor);
            if (!motorData) {
                response.json({
                    status: false,
                });
                return;
            }

            const getFrequency = async () => {
                if (typeof motorData.registers.readFrequency !== 'number') {
                    return;
                }

                const frequency = await this.connections.readRegister(
                    motorData.registers.readFrequency,
                    motorData.connection,
                );
                if (typeof frequency !== 'number') {
                    return;
                }

                return frequency;
            }

            const frequency = await getFrequency();
            const running = typeof frequency === 'number' ? frequency > 0 : false;
            const rpm = frequencyToRPM(frequency, motorData);
            const speed = speedFromFrequency(frequency, motorID);
            const direction = 'unknown';

            response.json({
                status: true,
                error: 0,
                running,
                frequency,
                rpm,
                speed,
                direction,
            } as ResponseStatus);
        });

        this.app.post('/restart', (request, response) => {
            const {
                token,
            } = request.query as CommonRequestParameters;

            const validRequest = handleToken(token);
            if (!validRequest) {
                response.json({
                    status: false,
                });
                return;
            }

            if (TEST_MODE) {
                console.log('MotorControl /restart');
                response.json({
                    status: true,
                });
                return;
            }

            execSync('pm2 restart all');

            response.json({
                status: true,
            });
        });

        this.app.get('/configuration', (_request, response) => {
            const motors = unpackMotors();
            const meta = unpackMeta();

            response.json({
                status: true,
                meta,
                motors,
            });
        });

        this.app.get('/events', (request, response) => {
            const {
                token,
            } = request.query as CommonRequestParameters;

            const validRequest = handleToken(token);
            if (!validRequest) {
                response.json({
                    status: false,
                });
                return;
            }

            response.setHeader('Cache-Control', 'no-cache');
            response.setHeader('Content-Type', 'text/event-stream');
            response.setHeader('Connection', 'keep-alive');

            // flush the headers to establish SSE with client
            response.flushHeaders();

            const subscriberID = Math.random() + '';
            this.eventSubscribers[subscriberID] = response;

            response.on('close', () => {
                // client dropped connection
                response.end();

                delete this.eventSubscribers[subscriberID];
            });
        });


        this.server = this.app.listen(
            PORT,
            () => {
                console.log(`MotorControl server started on ${PORT}`);
            },
        );
    }

    private getMotor(
        motorID?: string,
    ) {
        if (!motorID) {
            const [
                motorID,
                motorData,
            ] = Object.entries(this.options.motors)[0];

            return {
                motorID,
                motorData,
            };
        }

        return {
            motorID,
            motorData: this.options.motors[motorID],
        };
    }

    private parseTimedRequest(
        request: express.Request,
    ) {
        const {
            token,
            motor,
            duration,
        } = request.query;

        const tokenParsed = typeof token === 'string'
            ? token
            : undefined;
        const motorParsed = typeof motor === 'string'
            ? motor
            : undefined;
        const durationParsed = typeof duration == 'string'
            ? isNaN(parseInt(duration)) ? undefined : parseInt(duration)
            : undefined;

        const parameters: TimedRequestParameters =  {
            token: tokenParsed,
            motor: motorParsed,
            duration: durationParsed,
        };

        return parameters;
    }


    /**
     * Stop the MotorControl server.
     */
    public stop() {
        this.server?.close();
    }
}
// #endregion module



// #region exports
export default MotorControl;
// #endregion exports
