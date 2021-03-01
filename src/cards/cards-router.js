const express = require('express')
const logger = require('../logger')
const xss = require('xss')

const cardsRouter = express.Router()

const cardsService = require('./cards-service')

const serializeCard = card => ({
  title: xss(card.title),
  content: xss(card.content)
})

cardsRouter
  .route('/cards/:card_id')

  .all((req, res, next) => {
    const { card_id } = req.params
    cardsService.getById(req.app.get('db'), card_id)
      .then(card => {
        if (!card) {
          logger.error(`Card with id ${card_id} not found.`)
          return res.status(404).json({
            error: { message: `Card Not Found` }
          })
        }

        res.card = card
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(serializeCard(res.card))
  })


module.exports = cardsRouter