import http from 'http'
import httpProxy from 'http-proxy'
import zlib from 'zlib'
import { Transform, PassThrough } from 'stream'

import constants from './constants'
import DechunkStream from './DechunkStream'

const { UPSTREAM_URL, PORT } = constants

const proxy = httpProxy.createProxyServer({ secure: false, selfHandleResponse: true })

proxy.on('proxyRes', (upstreamResponse, req, res) => {
  // Get the content type from the upstream response
  const contentType = String(upstreamResponse.headers['content-type'])

  // Copy all headers from the upstream to the new response
  Object.entries(upstreamResponse.headers).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  // We're only transforming HTML content, so any other content can be piped back now
  if (!contentType.includes('text/html')) {
    upstreamResponse.pipe(res)
    return
  }

  // We're about to modify the content, so remove existing "content-length".
  res.removeHeader('content-length')

  // We're not compressing the transformed content, so remove existing content-encoding
  res.removeHeader('content-encoding', 'gzip')

  // Check the upstream content encoding to determine if it is compressed
  const upstreamContentEncoding = String(upstreamResponse.headers['content-encoding'])
  const isUpstreamCompressed = upstreamContentEncoding === 'gzip'

  // Create a decompression stream if required, otherwise passthrough
  const decompress = isUpstreamCompressed ? zlib.createGunzip() : new PassThrough()

  // Build the stream transformer for modifying the content
  const transform = new Transform({
    transform(chunk: Buffer, encoding, callback) {
      callback(null, Buffer.concat([Buffer.from('<-- NobodySpeak -->'), chunk]))
    },
  })

  // Pipe the upstream response through the decompression and transformer.
  const transformedContent = upstreamResponse.pipe(decompress).pipe(transform)

  // Check the incoming request's transfer-encoding preference
  const requestedTransferEncoding = String(req.headers['transfer-encoding'])
  const isChunkedResponseAllowed =
    requestedTransferEncoding.includes('chunked') || requestedTransferEncoding.includes('*')

  // If chunked responses are allowed, pipe the response now.
  // Otherwise combine the content into a non-chunked response.
  if (isChunkedResponseAllowed) {
    transformedContent.pipe(res)
  } else {
    const dechunk = new DechunkStream((content) => {
      // Calculate content-length and set it on the response
      const contentLength = content.byteLength
      res.setHeader('content-length', contentLength)

      // Remove any transfer-encoding
      res.removeHeader('transfer-encoding')

      // Write the content and send the response
      res.write(content)
      res.end()
    })

    // Pipe the transformed content into the dechunking stream
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
