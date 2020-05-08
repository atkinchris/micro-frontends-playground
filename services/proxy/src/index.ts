import http from 'http'
import httpProxy from 'http-proxy'
import zlib from 'zlib'
import { Transform, PassThrough } from 'stream'
import RewritingStream from 'parse5-html-rewriting-stream'
import fetch from 'node-fetch'

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

  // Check the upstream content encoding to determine if it is compressed
  const upstreamContentEncoding = String(upstreamResponse.headers['content-encoding'])
  const isUpstreamCompressed = upstreamContentEncoding === 'gzip'

  // Create a decompression stream if required, otherwise passthrough
  const decompress = isUpstreamCompressed ? zlib.createGunzip() : new PassThrough()
  // Encoding needs to be utf8 to ensure the downstream HTML parser can read the content
  decompress.setEncoding('utf8')

  // If upstream was compressed, we'll compress the response too
  const compress = isUpstreamCompressed ? zlib.createGzip() : new PassThrough()

  if (!isUpstreamCompressed) {
    // We're not compressing the transformed content, if it wasn't already,
    // so remove existing content-encoding
    res.removeHeader('content-encoding')
  }

  // Build the stream transformer for modifying the content and injecting demo fragments
  // Note: This is for demonstration purposes only.
  const transform = new Transform({
    transform(chunk: Buffer, encoding, callback) {
      callback(null, `${chunk}<fragment type="namecard" name="Chris" />`)
    },
    // Keep the content in utf8 for consumption by the HTML parser
    encoding: 'utf8',
  })

  // Build the parse5 HTML stream rewriter
  const rewriter = new RewritingStream()

  // When an opening tag is emitted from the rewriter, perform the following action
  rewriter.on('startTag', async (startTag) => {
    // Emit non-fragment tags straight back to the stream
    if (startTag.tagName !== 'fragment') {
      rewriter.emitStartTag(startTag)
      return
    }

    // Pause the upstream stream to prevent more content while we're processing
    upstreamResponse.pause()

    try {
      // Fetch a random website to simulate calling a component registry
      const response = await fetch('http://httpbin.org')

      // If the response was OK, get the HTML and emit it to the stream
      // We're ignoring errors for now, because this is a proof of concept
      if (response.ok) {
        const html = await response.text()
        rewriter.emitRaw(html)
      }
    } catch (err) {
      console.error(err)
    }

    // Resume the upstream stream
    upstreamResponse.resume()
  })

  // Pipe the upstream response through the streams.
  const transformedContent = upstreamResponse.pipe(decompress).pipe(transform).pipe(rewriter).pipe(compress)

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
