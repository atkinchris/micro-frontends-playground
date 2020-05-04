const http = require('http')
const Tailor = require('node-tailor')

const fetchTemplate = (request, parseTemplate) => {
  console.log(request, parseTemplate)
}

const tailor = new Tailor({
  fetchTemplate,
})

const server = http.createServer(tailor.requestHandler)
const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`Tailor service listening on ${port}`)
})
