FROM golang:1.14-alpine

ENV CONFIG_FILE views.json

RUN GO111MODULE=on go get -v github.com/ara-framework/nova-cluster@1.2.0

COPY views.json $CONFIG_FILE

CMD [ "nova-cluster" ]
