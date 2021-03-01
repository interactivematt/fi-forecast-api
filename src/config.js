module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  API_TOKEN: process.env.API_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL ||
    "postgresql://postgres@localhost/forecasts",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
}