import http from 'http'
import httpProxy from 'http-proxy'

import constants from './constants'

const { UPSTREAM_URL, PORT } = constants

const proxy = httpProxy.createProxyServer()
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: UPSTREAM_URL })
})

server.listen(PORT, () => {
  console.log(`Tailor service listening on ${PORT}`)
})
