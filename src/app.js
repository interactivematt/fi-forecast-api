require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const forecastsRouter = require('./forecasts/forecasts-router')
const cardsRouter = require('./cards/cards-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

var corsOptions = {
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,

}
app.use(morgan(morganOption))
app.use(helmet())
app.use(
  cors(corsOptions)
)
app.options('*', cors())
app.use(validateBearerToken)

app.use(forecastsRouter)
app.use(cardsRouter)

// error handling middleware 
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })

module.exports = app