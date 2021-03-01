const cardsRouter = require("./cards-router")

const cardsService = {
  getAllCards(knex){
    return knex.select('*').from('cards')
  },
  getById(knex, id) {
    return knex
      .from('cards')
      .select('*')
      .where('id', id)
      .first()
  }
}

module.exports = cardsService