const { Pool } = require('pg')

const pool = new Pool({
  user: 'bdbuser',
  host: 'localhost',
  database: 'wault',
  password: '',
  post: 5432
})

module.exports = pool