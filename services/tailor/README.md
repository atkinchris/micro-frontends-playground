# Layout Service

This is a service to read a template, find fragments in it, and stream calls to micro frontends to replace those fragments with their content.

It is a thin wrapper around [Tailor](https://github.com/zalando/tailor), to support using an upstream service as a template _and_ source of headers and status codes.

## Running

You will need [Node](https://nodejs.org) to run this project.

Clone this repository, change to the cloned directory, then execute:

```sh
npm install
npm run build
npm run start
```

Once running, visit [localhost:8080](http://localhost:8080) in your browser to see the content.

### Development Mode

To have the service rebuild and restart whenever code changes are made, run the following commands:

```sh
npm install
npm run watch
```

## Environment Variables

This applications supports passing configuration via environment variables.

- `PORT` - this is the port that the service will be bound to (default: `8080`).
- `UPSTREAM_URL` - this is the upstream URL to request templates from. It must be set.

### Dot Env

It's possible to set environment variables by creating a `.env` file alongside `package.json`.

```env
PORT=3000
UPSTREAM_URL=http://example.com
```
