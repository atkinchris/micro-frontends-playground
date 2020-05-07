import http from 'http'
import httpProxy from 'http-proxy'
import zlib from 'zlib'
import { pipeline, Transform, PassThrough } from 'stream'

import constants from './constants'

const { UPSTREAM_URL, PORT } = constants

const proxy = httpProxy.createProxyServer({ secure: false, selfHandleResponse: true })

proxy.on('proxyRes', (proxyRes, req, res) => {
  const contentType = String(proxyRes.headers['content-type'])

  // Copy all headers from the upstream to the response
  // I don't know why this isn't handled when piping the request
  Object.entries(proxyRes.headers).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  if (!contentType.includes('text/html')) {
    proxyRes.pipe(res)
    return
  }

  const contentEncoding = String(proxyRes.headers['content-encoding'])
  const isCompressed = contentEncoding === 'gzip'
  const decompress = isCompressed ? zlib.createGunzip() : new PassThrough()
  const compress = isCompressed ? zlib.createGzip() : new PassThrough()

  const transform = new Transform({
    objectMode: true,
    transform(chunk: Buffer, encoding, callback) {
      callback(null, Buffer.concat([Buffer.from('<-- NobodySpeak -->'), chunk]))
    },
  })

  pipeline(proxyRes, decompress, transform, compress, res)
})

const server = http.createServer((req, res) => {
  // Delete the host header, to prevent errors with routing on upstream
  delete req.headers.host

  proxy.web(req, res, { target: UPSTREAM_URL })
})

server.listen(PORT, () => {
  console.log(`Proxy listening on ${PORT}`)
})
