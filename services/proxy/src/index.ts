import http from 'http'
import httpProxy from 'http-proxy'
import Tailor from 'node-tailor'

import constants from './constants'
import streamToString from './streamToString'
import requestFragment from './requestFragment'

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

  // Convert the upstream response into a HTML string
  let html = await streamToString(upstreamResponse)

  // DEMO: Replace the banner on the homepage with a fragment
  html = html.replace(
    /(<main.*?)<section\b[^>]*>(.*?)<\/section>/s,
    `$1
    <section class="tu-homepage__container ln-u-soft-bottom ln-u-soft-top tu-homepage__container--fullwidth">
      <fragment src="http://localhost:3000/header" name="Chris"/>
    </section>
    `
  )

  // We're about to modify the content, so remove existing "content-length" and "content-encoding".
  res.removeHeader('content-length')
  res.removeHeader('content-encoding')

  // Create an instance of Tailor with the HTML as the template
  const tailor = new Tailor({
    requestFragment,
    fetchTemplate: (_req, parseTemplate) => parseTemplate(html),
  })

  // Log errors from Tailor, which are otherwise suppressed
  tailor.on('error', (_req, error) => {
    console.error(error)
  })

  // Use Tailor to handle the request and response
  tailor.requestHandler(req, res)
})

const server = http.createServer((req, res) => {
  // Delete the host header, to prevent errors with routing on upstream
  delete req.headers.host

  proxy.web(req, res, { target: UPSTREAM_URL })
})

server.listen(PORT, () => {
  console.log(`Proxy listening on ${PORT}`)
})
