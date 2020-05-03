FROM golang:1.14-alpine

ARG VERSION=1.1.0
ENV CONFIG_FILE=/config.json

RUN GO111MODULE=on go get -v github.com/ara-framework/nova-proxy@$VERSION

COPY docker-entrypoint.sh /
COPY config.json $CONFIG_FILE

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "nova-proxy" ]
