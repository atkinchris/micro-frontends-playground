import http from 'http'
import httpProxy from 'http-proxy'

import constants from './constants'
import streamToDocument from './streamToDocument'
import respondWithDocument from './respondWithDocument'

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

  // Convert the upstream response into a HTML Document
  const document = await streamToDocument(upstreamResponse)

  // Respond with the HTML Document
  await respondWithDocument(res, document)
})

const server = http.createServer((req, res) => {
  // Delete the host header, to prevent errors with routing on upstream
  delete req.headers.host

  proxy.web(req, res, { target: UPSTREAM_URL })
})

server.listen(PORT, () => {
  console.log(`Proxy listening on ${PORT}`)
})
