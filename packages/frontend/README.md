<p align="center">
    <a target="_blank" href="https://aveled.com">
        <img src="https://raw.githubusercontent.com/aveled/motor-control/master/about/identity/motor-control.png" height="250px">
    </a>
    <br />
    <br />
    <a target="_blank" href="https://github.com/aveled/motor-control/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    motor control
</h1>


<h3 align="center">
    Control Motors from Web API/Application
</h3>



### Contents

+ [About](#about)
+ [Backend](#backend)
+ [Frontend](#frontend)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## About

`MotorControl` is a lightweight Web Application Programming Interface (API) for (semi-)industrial contexts intended to be consumed from the Web Application or programmatically in order to run simple motor control tasks: start, stop, reverse, change frequency/revolutions per minute.

As architecture, the `MotorControl backend` is meant to speak over Modbus, TCP/IP or RTU, with a Programmable Logic Controller (PLC) or Variable-Frequency Drive (VFD). The configuration of the backend specifies registers and values. The `MotorControl frontend` is a simple web application configured to speak over HTTP with the backend. Both the backend and the frontend can be hosted on the same Single-Board Computer (SBC), with the web application made available through the WiFi local Router (WFR).

<p align="center">
    <img src="https://raw.githubusercontent.com/aveled/motor-control/master/about/diagrams/architecture.png" height="230px">
</p>

On the SBC, both the backend and the frontend are meant to be run using [`NodeJS`](https://nodejs.org) and [`pm2`](https://pm2.io).



## Backend

### Configuration

The configuration interface

``` typescript
interface MotorControlOptions {
    connections: Record<string, Connection>;
    motors: Record<string, Motor>;
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
    };
}

type Connection = ModbusTCPConnection | ModbusRTUConnection;

interface ModbusTCPConnection {
    default?: boolean;
    type: 'modbusTCP';
    ip: string;
    port: number;
    id: number;
}

interface ModbusRTUConnection {
    default?: boolean;
    type: 'modbusRTU';
    path: string;
    baudRate: number;
    dataBits: number;
    stopBits: number;
    parity: 'even' | 'odd' | 'none' | 'mark' | 'space' | undefined;
}

interface Motor {
    default?: boolean;
    connection?: string;
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
```

Example:

``` typescript
import MotorControlBackend from '@aveled/motor-control-backend';


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
                frequency: 400,
            },
            directions: true,
        },
    },
    connections: {
        modbus: {
            type: 'modbusTCP',
            ip: '192.168.100.97',
            port: 502,
            id: 1,
        },
    },
    frontend: {
        title: 'custom title',
        favicon: '',
        pageTitle: '',
        pageIcon: '',
    },
});
```


### Endpoints

```
/start

POST - starts the motor
parameters {
    token?: string
    motor?: string
    duration?: number
}
```

```
/stop

POST - stops the motor
parameters {
    token?: string
    motor?: string
}
```

```
/reverse

POST - reverses the motor
parameters {
    token?: string
    motor?: string
    duration?: number
}
```

```
/left

POST - rotates left the motor
parameters {
    token?: string
    motor?: string
    duration?: number
}
```

```
/right

POST - rotates right the motor
parameters {
    token?: string
    motor?: string
    duration?: number
}
```

```
/frequency

GET - gets the frequency of the motor
parameters {
    token?: string
    motor?: string
}

POST - sets the frequency of the motor
parameters {
    token?: string
    motor?: string
}
```

```
/rpm

GET - gets the rotations per minute of the motor
parameters {
    token?: string
    motor?: string
}

POST - sets the rotations per minute of the motor
parameters {
    token?: string
    motor?: string
}
```

```
/status

GET - gets the status of the motor
parameters {
    token?: string
    motor?: string
}
response {
    error: number
    running: boolean
    frequency: number
    rpm: number
    direction: 'left' | 'right' | 'unknown'
}
```

```
/restart

POST - restart server
parameters {
    token?: string
}
```



## Frontend

### Configuration

The frontend requires the `endpoint` of the backend.

``` typescript
import MotorControlFrontend from '@aveled/motor-control-frontend';


MotorControlFrontend({
    endpoint: 'http://192.168.100.98:34500',
});
```



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@aveled/motor-control-backend">
    <img src="https://img.shields.io/npm/v/@aveled/motor-control-backend.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@aveled/motor-control-backend][motor-control-backend] • the backend server

[motor-control-backend]: https://github.com/aveled/motor-control/tree/master/packages/backend


<a target="_blank" href="https://www.npmjs.com/package/@aveled/motor-control-frontend">
    <img src="https://img.shields.io/npm/v/@aveled/motor-control-frontend.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@aveled/motor-control-frontend][motor-control-frontend] • the frontend server

[motor-control-frontend]: https://github.com/aveled/motor-control/tree/master/packages/frontend



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
