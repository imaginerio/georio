const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const interceptor = require('express-interceptor');
const api = require('@api');
const { errorMiddleware } = require('@middlewares/error');
const middlewareMonitoring = require('@middlewares/monitoring');

/**
* Express instance
* @public
*/
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Monitoring
app.use(middlewareMonitoring);

const finalParagraphInterceptor = interceptor((req, res) => { // eslint-disable-line
  return {
    isInterceptable: () => true,
    intercept: (body, send) => {
      try {
        req.responseBody = JSON.parse(body);
      } catch (e) {
        req.responseBody = body;
      }
      send(body);
    }
  };
});

app.use(finalParagraphInterceptor);

/**
 * Health status
 */
const healthRoute = express.Router();
healthRoute.get('/health', (req, res) => res.send('OK'));
app.use('/', healthRoute);

// enable authentication

// mount api routes
app.use('/api', api);

// if error is not an instanceOf APIError, convert it.
app.use(errorMiddleware.converter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(errorMiddleware.handler);

module.exports = app;
