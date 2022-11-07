curl -X POST http://localhost:34500/start

curl -X POST http://localhost:34500/stop

curl -X POST http://localhost:34500/reverse


curl -X POST http://localhost:34500/left

curl -X POST http://localhost:34500/right


curl -d '{"value": 200}' \
    -H 'Content-Type: application/json' \
    -X POST http://localhost:34500/frequency

curl http://localhost:34500/frequency


curl -d '{"value": 200}' \
    -H 'Content-Type: application/json' \
    -X POST http://localhost:34500/rpm

curl http://localhost:34500/rpm


curl http://localhost:34500/status
