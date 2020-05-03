FROM golang:1.14-alpine

ARG VERSION=1.2.0
ENV CONFIG_FILE views.json

RUN GO111MODULE=on go get -v github.com/ara-framework/nova-cluster@$VERSION

COPY views.json $CONFIG_FILE

CMD [ "nova-cluster" ]
