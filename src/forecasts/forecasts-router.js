const express = require('express')
const {v4: uuid} = require('uuid')
const logger = require('../logger')

const forecastsRouter = express.Router()
const bodyParser = express.json()

const forecastsService = require('./forecasts-service')

const serializeForecast = forecast => ({
  current_age: Number(forecast.current_age),
  net_income: Number(forecast.net_income),
  income_increase: Number(forecast.income_increase),
  current_spending: Number(forecast.current_spending),
  current_savings: Number(forecast.current_savings),
  future_spending: Number(forecast.future_spending),
  input_roi: Number(forecast.input_roi),
  input_withdrawal_rate: Number(forecast.input_withdrawal_rate)
})

forecastsRouter
  .route('/api')

  .post(bodyParser, (req, res, next) => {
    const { 
      current_age, net_income, income_increase, current_spending, current_savings, future_spending, input_roi, input_withdrawal_rate
    } = req.body;
    
    const id = uuid()

    const newForecast = {
      current_age,
      net_income,
      income_increase,
      current_spending,
      current_savings,
      future_spending,
      input_roi,
      input_withdrawal_rate
    }
    
    forecastsService.insertForecast(
      req.app.get('db'),
      newForecast
    )
      .then(forecast => {
        logger.info(`Forecast with id ${id} created`)
        res
          .status(201)
          .location(`http://localhost:8000/api/${id}`)
          .json(forecast)
      })
      .catch(next)
  })

forecastsRouter
  .route('/api/:forecast_id')

  .all((req, res, next) => {
    const { forecast_id } = req.params
    forecastsService.getById(req.app.get('db'), forecast_id)
      .then(forecast => {
        if (!forecast) {
          logger.error(`Forecast with id ${forecast_id} not found.`)
          return res.status(404).json({
            error: { message: `Forecast Not Found` }
          })
        }

        res.forecast = forecast
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(serializeForecast(res.forecast))
  })

module.exports = forecastsRouter