const path = require('path')
const express = require('express')

const hbs = require('hbs')
const directive = require('hypernova-handlebars-directive')

directive(hbs)

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.render('index', { title: 'Example Website' })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
