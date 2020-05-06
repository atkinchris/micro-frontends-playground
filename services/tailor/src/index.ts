import http from 'http'
import { URL } from 'url'
import Tailor from 'node-tailor'
import httpProxy from 'http-proxy'
import { extname } from 'path'

import patchResponse from './patchResponse'
import fetchTemplate from './fetchTemplate'
import constants from './constants'

const { UPSTREAM_URL, PORT } = constants

const tailor = new Tailor({
  // Tailor has incorrect published types on their latest version
  // https://github.com/zalando/tailor/commit/7283c2f
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchTemplate: fetchTemplate as any,
})

const proxy = httpProxy.createProxyServer({secure: false})
const server = http.createServer((req, res) => {
  // delete req.headers.host
  // Read the incoming URL, and detect if the pathname has an extension
  // This is to proxy requests for assets, rather than pages
  // This is very fragile, and will not work reliably
  const url = new URL(req.url, UPSTREAM_URL)
  if (extname(url.pathname)) {
    proxy.web(req, res, { target: UPSTREAM_URL })
    return
  }

  // Patch the response object to load in response properties from upstream
  patchResponse(req, res)

  tailor.requestHandler(req, res)
})

server.listen(PORT, () => {
  console.log(`Tailor service listening on ${PORT}`)
})
