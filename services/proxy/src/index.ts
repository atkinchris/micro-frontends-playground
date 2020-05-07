import http from 'http'
import httpProxy from 'http-proxy'
import zlib from 'zlib'
import { Transform, PassThrough } from 'stream'

import constants from './constants'
import DechunkStream from './DechunkStream'

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

  // We're about to alter the content, so remove existing "content-length".
  res.removeHeader('content-length')

  // We're compressing the transformed content, so set content-encoding to 'gzip'
  res.setHeader('content-encoding', 'gzip')

  const upstreamContentEncoding = String(proxyRes.headers['content-encoding'])
  const isUpstreamCompressed = upstreamContentEncoding === 'gzip'

  const upstreamTransferEncoding = String(proxyRes.headers['transfer-encoding'])
  const isUpstreamChunked = upstreamTransferEncoding === 'chunked'

  const decompress = isUpstreamCompressed ? zlib.createGunzip() : new PassThrough()
  const compress = isUpstreamCompressed ? zlib.createGzip() : new PassThrough()

  const transform = new Transform({
    transform(chunk: Buffer, encoding, callback) {
      callback(null, Buffer.concat([Buffer.from('<-- NobodySpeak -->'), chunk]))
    },
  })

  const transformedContent = proxyRes.pipe(decompress).pipe(transform).pipe(compress)

  if (isUpstreamChunked) {
    transformedContent.pipe(res)
  } else {
    const dechunk = new DechunkStream((content) => {
      const contentLength = content.byteLength

      res.setHeader('content-length', contentLength)
      res.removeHeader('transfer-encoding')
      res.write(content)
      res.end()
    })

    transformedContent.pipe(dechunk)
  }
})

const server = http.createServer((req, res) => {
  // Delete the host header, to prevent errors with routing on upstream
  delete req.headers.host

  proxy.web(req, res, { target: UPSTREAM_URL })
})

server.listen(PORT, () => {
  console.log(`Proxy listening on ${PORT}`)
})
