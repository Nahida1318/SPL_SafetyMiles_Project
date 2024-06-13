const { query } = require('express');
const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
  user: 'zcronawg',
  password: 'WKNyEPt8Eq1o16jsxwuozkwQpcAys_Iw',
  host: 'flora.db.elephantsql.com',
  port: 5432, // default Postgres port
  database: 'zcronawg'
});


module.exports = pool
