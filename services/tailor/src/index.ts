import http from 'http'
import { URL } from 'url'
import Tailor from 'node-tailor'
import httpProxy from 'http-proxy'
import { extname } from 'path'

import patchWriteHead from './patchWriteHead'
import fetchTemplate from './fetchTemplate'
import constants from './constants'
import { Context, RequestWithContext } from './types'

const { UPSTREAM_URL, PORT } = constants

const tailor = new Tailor({
  // Tailor has incorrect published types on their latest version
  // https://github.com/zalando/tailor/commit/7283c2f
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchTemplate: fetchTemplate as any,
})

const proxy = httpProxy.createProxyServer()
const server = http.createServer((req, res) => {
  // Delete host from request headers, to prevent certificate errors when headers are passed
  delete req.headers.host

  // Read the incoming URL, and detect if the pathname has an extension
  // This is to proxy requests for assets, rather than pages
  // This is very fragile, and will not work reliably
  const url = new URL(req.url, UPSTREAM_URL)
  if (extname(url.pathname)) {
    proxy.web(req, res, { target: UPSTREAM_URL })
    return
  }

  // Build an empty, request safe context that we can use to move data around
  const context: Context = {}

  // Attach context to the req object, that will be passed through Tailor
  const requestWithContext: RequestWithContext = Object.assign(req, { context })

  // Patch the writeHead method on the response object, to inject new headers before the request is ended by Tailor
  patchWriteHead(res, context)

  tailor.requestHandler(requestWithContext, res)
})

server.listen(PORT, () => {
  console.log(`Tailor service listening on ${PORT}`)
})
