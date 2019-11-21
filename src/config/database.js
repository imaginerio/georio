const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(process.cwd(), '.env'),
  sample: path.join(process.cwd(), '.env.example')
});

module.exports = {
  url: process.env.NODE_ENV === 'test' ? process.env.DB_URL_TEST : process.env.DB_URL,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 300000,
    idle: 10000
  }
};
