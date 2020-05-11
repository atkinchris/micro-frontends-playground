const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.disable('view cache')

const port = process.env.PORT || 3020

app.get('/sort', (req, res) => {
  const { name } = req.query

  // Every Fragment sends a link header that describes its resources - css and js
  const css = `<http://localhost:${port}/styles.css>; rel="stylesheet"`
  // this will be fetched using require-js as an amd module
  const js = `<http://localhost:${port}/scripts.js>; rel="fragment-script"`

  res.set('Link', `${css}, ${js}`)

  res.render('sort', { name })
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Component listening at http://localhost:${port}`))
