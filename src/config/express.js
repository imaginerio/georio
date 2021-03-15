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
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const { errorMiddleware } = require('@middlewares/error');
const { loginMiddleware } = require('@middlewares/login');
const middlewareMonitoring = require('@middlewares/monitoring');
const passportConfig = require('./passport');
const api = require('@api');
const { sequelize } = require('@models');
const { sessionKey, sentry } = require('./vars');

/**
* Express instance
* @public
*/
const app = express();

Sentry.init({
  dsn: sentry,
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
  tracesSampleRate: 1.0
});

if (process.env.NODE_ENV !== 'test') {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.get('/debug-sentry', () => {
    console.log('ERROR');
    throw new Error('My first Sentry error!');
  });
}

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
const origin = process.env.NODE_ENV === 'production' ? 'https://beta.beirut.levantcarta.org' : 'http://localhost:3000';
app.use(cors({
  origin,
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

// jwt parser
app.use(passport.authenticate('jwt', { session: false }));

// mount api routes
app.use('/api', api);

// docs route
app.use('/docs', express.static(path.join(__dirname, '../../docs')));

// public route
app.use('/', express.static(path.join(__dirname, '../../public')));

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// if error is not an instanceOf APIError, convert it.
app.use(errorMiddleware.converter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(errorMiddleware.handler);

module.exports = app;
