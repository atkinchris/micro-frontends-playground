const path = require('path')
const express = require('express')

const hbs = require('hbs')
const directive = require('hypernova-handlebars-directive')

directive(hbs)

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.disable('view cache')

const { PORT = 8080, COMPONENT_URL } = process.env

app.get('/', (req, res) => {
  res.render('index', { name: 'Chris', componentUrl: COMPONENT_URL })
})

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
