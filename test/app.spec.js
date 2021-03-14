const knex = require('knex')
const app = require('../src/app')

describe('Forecasts Endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
    console.log(process.env.API_TOKEN)
  })

  describe('GET /api/forecasts', () => {
    context(`Given no forecasts`, () => {
      it(`responds with 404 and an empty list`, () => {
        return supertest(app)
          .get('/api/cards')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {})
      })
    })
  })
  
  describe('GET /api/forecasts/:id', () => {
    context(`Given no forecasts`, () => {
      it(`responds 404 when forecast doesn't exist`, () => {
        return supertest(app)
          .get(`/api/forecasts/1`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
          })
      })
    })
  })

  describe('GET /api/cards', () => {
    context(`Given no cards`, () => {
      it(`responds with 404 and an empty list`, () => {
        return supertest(app)
          .get('/api/cards')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {})
      })
    })
  })

  describe('GET /api/cards/:id', () => {
    context(`Given no cards`, () => {
      it(`responds 404 when card doesn't exist`, () => {
        return supertest(app)
          .get(`/api/cards/1`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
          })
      })
    })
  })

  describe('POST /forecasts', () => {
    ['title', 'url', 'rating'].forEach(field => {
      const newForecast = {
        title: 'test-title',
        url: 'https://test.com',
        rating: 2,
      }

      it(`responds with 400 missing '${field}' if not supplied`, () => {
        delete newForecast[field]

        return supertest(app)
          .post(`/forecasts`)
          .send(newForecast)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(500, { message: 'Unable to acquire a connection', error: {} })
      })
    })
  })
})
