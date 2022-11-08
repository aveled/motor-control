// #region imports
    // #region libraries
    import {
        ThemeName,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface CommonRequestParameters {
    token?: string;
    motor?: string;
}

export interface RestartRequestParameters {
    token?: string;
}

export type TimedRequestParameters = CommonRequestParameters & {
    duration?: number;
}


export type MotorError =
    | 0 // No issue
    | 1; // No motor response


export interface ResponseStatus {
    error: MotorError;
    running: boolean;
    frequency: number;
    rpm: number;
    direction: 'left' | 'right' | 'unknown';
}



export interface ModbusTCPConnection {
    default?: boolean;
    type: 'modbusTCP';
    ip: string;
    port: number;
    id: number;
}

export interface ModbusRTUConnection {
    default?: boolean;
    type: 'modbusRTU';
    path: string;
    baudRate: number;
    dataBits: number;
    stopBits: number;
    parity: 'even' | 'odd' | 'none' | 'mark' | 'space' | undefined;
}

export type Connection = ModbusTCPConnection | ModbusRTUConnection;

export interface Motor<C = string> {
    default?: boolean;
    connection?: C;
    poles: 2 | 4;
    registers: Record<string, number>;
    values: Record<string, number>;
    directions?: boolean | {
        left: 'start' | 'reverse';
        right: 'start' | 'reverse';
        duration?: number;
    };
    frequencyRange?: {
        start: number;
        end: number;
        step: number;
    };
    hooks?: {
        frequencyRead?: (value: number) => number;
        frequencyWrite?: (value: number) => number;
    },
}


export interface MotorControlOptions<C = Record<string, Connection>> {
    connections: C;
    motors: Record<
        string,
        keyof C extends `${infer U}` ? Motor<U> : Motor<string>
    >;
    frontend?: {
        title?: string;
        /**
         * URL or Base64 data image, e.g. `data:image/x-icon;base64,...`
         */
        favicon?: string;
        pageTitle?: string;
        /**
         * URL or Base64 data image, e.g. `data:image/x-icon;base64,...`
         */
        pageIcon?: string;
        /**
         * Plurid ThemeName, https://github.com/plurid/plurid-themes#usage
         *
         * `'night'`, `'light'`, `'plurid'`, etc.
         */
        theme?: Exclude<ThemeName, 'generated'>;
        language?: 'english' | 'french' | 'german' | 'romanian'
            | 'chinese' | 'japanese' | 'hindi';
    };
}
// #endregion module
