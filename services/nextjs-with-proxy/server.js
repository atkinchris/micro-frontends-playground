/* eslint-disable no-console */
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware');


const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
})

const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    const proxyMiddlewareBaseOptions = { target: 'https://dev.tuclothing.sainsburys.co.uk:9002/', changeOrigin: true, secure: false }
    const proxyMiddleware = createProxyMiddleware(proxyMiddlewareBaseOptions)

    /*
    (req, res) => {
      return handle(req, res)
    }
     */
    // server.use('/c/*', createProxyMiddleware({...proxyMiddlewareBaseOptions, selfHandleResponse: true, onProxyRes: (proxyRes, req, res) => {
    //       console.log(res);
    //       return app.render(req, res, '/plp')
    //   }}));

    // server.all('*', (req, res) => {
    //   return handle(req, res)
    // })


    server.get('/c/*', (req, res) => {
      app.render(req, res, '/plp')
    }, handle)

    server.get('/a', (req, res) => {
      return app.render(req, res, '/a', req.query)
    }, handle)

    server.get('/b', (req, res) => {
      return app.render(req, res, '/b', req.query)
    }, handle)

    // server.all('*', proxyMiddleware);


    // Default catch-all handler to allow Next.js to handle all other routes
    // server.all('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })


// const express = require('express')
// const next = require('next')

// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()
//
// app.prepare().then(() => {
//   const server = express()



  // server.listen(port, err => {
  //   if (err) throw err
  //   console.log(`> Ready on http://localhost:${port}`)
//   })
// })
