const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(process.cwd(), '.env'),
  sample: path.join(process.cwd(), '.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  serviceName: 'georio',
  sessionKey: process.env.SESSION_SECRET,
  http: {
    timeout: 5000,
    responseType: 'json',
    responseEncoding: 'utf8',
    retries: 3
  },
  sanitizedFields: []
};
