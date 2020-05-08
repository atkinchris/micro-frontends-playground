import http from 'http'
import httpProxy from 'http-proxy'
import { serialize } from 'parse5'

import constants from './constants'
import streamToDocument from './streamToDocument'

const { UPSTREAM_URL, PORT } = constants

const proxy = httpProxy.createProxyServer({ secure: false, selfHandleResponse: true })

proxy.on('proxyRes', async (upstreamResponse, req, res) => {
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

  // We're about to modify the content, so remove existing "content-length" and "content-encoding".
  res.removeHeader('content-length')
  res.removeHeader('content-encoding')

  // Convert the upstream response into a HTML Document
  const document = await streamToDocument(upstreamResponse)

  // Serialise the document to a HTML string
  const html = serialize(document)

  // Convert the string to a Buffer, for byte length and sending
  const htmlBuffer = Buffer.from(html)

  // Calculate content-length and set it on the response
  const contentLength = htmlBuffer.byteLength
  res.setHeader('content-length', contentLength)

  // Write the content and send the response
  res.write(htmlBuffer)
  res.end()
})

const server = http.createServer((req, res) => {
  // Delete the host header, to prevent errors with routing on upstream
  delete req.headers.host

  proxy.web(req, res, { target: UPSTREAM_URL })
})

server.listen(PORT, () => {
  console.log(`Proxy listening on ${PORT}`)
})
