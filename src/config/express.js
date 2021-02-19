const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const httpStatus = require('http-status');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const interceptor = require('express-interceptor');
const { errorMiddleware } = require('@middlewares/error');
const { loginMiddleware } = require('@middlewares/login');
const middlewareMonitoring = require('@middlewares/monitoring');
const passportConfig = require('./passport');
const api = require('@api');
const { sequelize } = require('@models');
const { sessionKey } = require('./vars');

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
app.use(cors({
  origin: ['https://beta.beirut.levantcarta.org', 'http://localhost:3000'],
  credentials: true
}));

// Monitoring
app.use(middlewareMonitoring);

// const finalParagraphInterceptor = interceptor((req, res) => { // eslint-disable-line
//   return {
//     isInterceptable: () => true,
//     intercept: (body, send) => {
//       try {
//         req.responseBody = JSON.parse(body);
//       } catch (e) {
//         req.responseBody = body;
//       }
//       send(body);
//     }
//   };
// });

// app.use(finalParagraphInterceptor);

// enable authentication
if (process.env.NODE_ENV !== 'test') {
  passportConfig(passport);
  app.use(
    session({
      secret: sessionKey,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
      },
      store: new SequelizeStore({
        db: sequelize
      })
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

/**
 * Health status
 */
const healthRoute = express.Router();
healthRoute.get('/health', (req, res) => res.send('OK'));
app.use('/', healthRoute);

// enable authentication
// enable authentication
app.post('/api/v1/login', loginMiddleware);
app.get('/api/v1/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send({
    responseCode: httpStatus.OK,
    responseMessage: 'Logged out'
  });
});
app.get('/session', (req, res) => {
  res.send({
    responseCode: httpStatus.OK,
    responseMessage: req.session.passport
  });
});

// mount api routes
app.use('/api', api);

// docs route
app.use('/docs', express.static(path.join(__dirname, '../../docs')));

// public route
app.use('/', express.static(path.join(__dirname, '../../public')));

// if error is not an instanceOf APIError, convert it.
app.use(errorMiddleware.converter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(errorMiddleware.handler);

module.exports = app;
