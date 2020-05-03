FROM golang:1.14-alpine

ENV CONFIG_FILE=/config.json

RUN GO111MODULE=on go get -v github.com/ara-framework/nova-proxy@1.1.0

COPY docker-entrypoint.sh /
COPY config.json $CONFIG_FILE

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "nova-proxy" ]
