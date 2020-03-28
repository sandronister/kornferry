// eslint-disable-next-line one-var
const express = require('express'),
  consign = require('consign'),
  bodyParses = require('body-parser'),
  morgan = require('morgan'),
  logger = require('../services/logger'),
  passport = require('../services/auth'),
  helmet = require('helmet'),
  cors = require('cors');




const app = express()

app.use(helmet())
app.use(cors())

app.disable('x-powered-by')

app.use(bodyParses.urlencoded({ extended: true }))
app.use(bodyParses.json())
app.use(morgan('common', {
  stream: {
    write: function (message) {
      logger.info(message)
    }
  }
}))

consign()
  .include('routers')
  .then('persistence')
  .then('services')
  .into(app)

const auth = passport(app)
app.use(auth.initialize())

module.exports = app;
