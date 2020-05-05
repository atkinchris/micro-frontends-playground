const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.disable('view cache')

const port = process.env.PORT || 3000

app.get('/header', (req, res) => {
  const { name } = req.query
  res.render('header', { name })
})

app.listen(port, () => console.log(`Component listening at http://localhost:${port}`))
