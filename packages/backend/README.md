# Motoris Backend


## Configuration

``` typescript
import Motoris from '@aveled/motoris-backend';

const motoris = new Motoris({
    motors: {
        one: {
            // default: true,
            // connection: 'modbus',
            poles: 4,
            registers: {
                READ_STATE: 20,
                READ_FREQUENCY: 21,
                STARTSTOP: 16,
                WRITE_FREQUENCY: 17,
            },
            values: {
                start: 3,
                reverse: 6,
                stop: 0,
                frequency: 400,
            },
            hooks: {
                frequencyRead: (value) => value,
                frequencyWrite: (value) => value,
            },
        },
    },
    connections: {
        modbus: {
            // default: true,
            type: 'modbus',
            ip: '192.168.0.99',
            port: 502,
            id: 1,
        },
    },
});
```


## Endpoints

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
