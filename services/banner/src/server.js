import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import path from 'path'

import App from './components/App'
import constants from './constants'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(path.join(__dirname, 'public')))
  .get('/*', (req, res) => {
    const markup = renderToString(<App />)

    res.status(200).send(
      `
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <div id="${constants.ROOT_ID}">${markup}</div>`
    )
  })

export default server
