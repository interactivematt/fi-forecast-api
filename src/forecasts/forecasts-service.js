const forecastsService = {
  getAllForecasts(knex){
    return knex.select('*').from('forecasts')
  },
  getById(knex, id) {
    return knex
      .from('forecasts')
      .select('*')
      .where('id', id)
      .first()
  },
  insertForecast(knex, newForecast) {
    return knex
      .insert(newForecast)
      .into('forecasts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  }
}

module.exports = forecastsService