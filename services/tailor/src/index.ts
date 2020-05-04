import http from 'http'
import { URL } from 'url'
import Tailor from 'node-tailor'
import httpProxy from 'http-proxy'
import { extname } from 'path'

import patchResponse from './patchResponse'
import fetchTemplate from './fetchTemplate'
import constants from './constants'

const { UPSTREAM_URL, PORT } = constants

const tailor = new Tailor({ fetchTemplate: fetchTemplate as any })
const proxy = httpProxy.createProxyServer()
const server = http.createServer((req, res) => {
  delete req.headers.host

  const url = new URL(req.url, UPSTREAM_URL)
  if (extname(url.pathname)) {
    proxy.web(req, res, { target: UPSTREAM_URL })
    return
  }

  patchResponse(req, res)

  tailor.requestHandler(req, res)
})

server.listen(PORT, () => {
  console.log(`Tailor service listening on ${PORT}`)
})
