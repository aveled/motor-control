// #region imports
    // #region libraries
    import ModbusRTU from 'modbus-serial';
    // #endregion libraries


    // #region external
    import {
        Connection,
    } from '~data/interfaces';

    import {
        TEST_MODE,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
class ConnectionsManager {
    private connectionsData: Record<string, Connection>;
    private connections: Record<string, ModbusRTU> = {};
    private defaultConnection: string | undefined;

    /**
     * Used in TEST_MODE.
     */
    private testCache = {};


    constructor(
        connections: Record<string, Connection>,
    ) {
        this.connectionsData = connections;

        this.setup();
    }


    private async setup() {
        for (const [id, data] of Object.entries(this.connectionsData)) {
            if (TEST_MODE) {
                continue;
            }

            const client = new ModbusRTU();

            if (data.type === 'modbusTCP') {
                await client.connectTCP(
                    data.ip,
                    {
                        port: data.port,
                    },
                );
                client.setID(data.id);
            } else if (data.type === 'modbusRTU') {
                await client.connectRTUBuffered(
                    data.path,
                    {
                        baudRate: data.baudRate,
                        dataBits: data.dataBits,
                        stopBits: data.stopBits,
                        parity: data.parity,
                    },
                );
            }

            this.connections[id] = client;

            if (data.default) {
                this.defaultConnection = id;
            }
        }

        if (!this.defaultConnection) {
            const [id] = Object.entries(this.connectionsData)[0];
            this.defaultConnection = id;
        }
    }


    private getConnection(
        connection?: string,
    ) {
        const connectionID = connection || this.defaultConnection;
        if (!connectionID) {
            throw `no such connection ${connectionID}`;
        }

        return this.connections[connectionID];
    }


    public async writeRegister(
        dataAddress: number,
        value: number,
        connectionID?: string,
    ) {
        if (TEST_MODE) {
            console.log(`MotorControl writeRegister connectionID ${connectionID || this.defaultConnection}: dataAddress ${dataAddress} :: value ${value}`);
            this.testCache[dataAddress] = value;
            return;
        }

        const connection = this.getConnection(connectionID);

        const result = await connection.writeRegister(dataAddress, value);

        return result;
    }

    public async readRegister(
        register: number,
        connectionID?: string,
    ) {
        if (TEST_MODE) {
            console.log(`MotorControl readRegister connectionID ${connectionID || this.defaultConnection}: register ${register}`);
            return this.testCache[register];
        }

        const connection = this.getConnection(connectionID);

        const result = await connection.readHoldingRegisters(register, 1);

        return result.data[0];
    }
}
// #endregion module



// #region exports
export default ConnectionsManager;
// #endregion exports
