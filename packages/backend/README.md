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



## Backend

### Configuration

``` typescript
import MotorControl from '@aveled/motor-control-frontend';


new MotorControl({
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
        title: '',
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

``` typescript
import generateServer from '@aveled/motor-control-frontend';


const configuration = {
    endpoint: 'http://192.168.100.98:34500',
};

generateServer(configuration);
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
