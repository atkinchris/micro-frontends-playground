import http, { IncomingMessage } from 'http'
import { URL } from 'url'
import Tailor from 'node-tailor'
import fetch from 'node-fetch'
import httpProxy from 'http-proxy'
import { extname } from 'path'

const { UPSTREAM_URL = 'https://tuclothing.sainsburys.co.uk', PORT = 8080 } = process.env

const fetchTemplate = async (request: IncomingMessage, parseTemplate: (html: string) => any) => {
  const url = `${UPSTREAM_URL}${request.url}`

  const response = await fetch(url, {
    headers: request.headers as Record<string, string>,
    method: request.method,
  })

  const html = await response.text()

  return parseTemplate(html)
}

const tailor = new Tailor({
  fetchTemplate: fetchTemplate as any,
})

const proxy = httpProxy.createProxyServer()
const server = http.createServer((req, res) => {
  delete req.headers.host

  const url = new URL(req.url, UPSTREAM_URL)
  if (extname(url.pathname)) {
    proxy.web(req, res, { target: UPSTREAM_URL })
    return
  }

  tailor.requestHandler(req, res)
})

server.listen(PORT, () => {
  console.log(`Tailor service listening on ${PORT}`)
})
