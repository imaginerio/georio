//  login.middleware.js
//  Project hpi
//
//  Created by Axis Maps on 6/16/2020, 10:35:21 PM
//

const passport = require('passport');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { sessionKey } = require('@config/vars');

const authenticate = (req, res, next) => new Promise((resolve, reject) => {
  passport.authenticate('local', (err, user) => {
    if (err) return reject(err);
    return resolve(user);
  })(req, res, next);
});

const login = (req, user) => new Promise((resolve, reject) => {
  req.login(user, { session: false }, (err) => {
    if (err) reject(err);
    return resolve();
  });
});

// const regenerateSession = req => new Promise((resolve, reject) => {
//   req.session.regenerate((err) => {
//     if (err) return reject(err);
//     return resolve();
//   });
// });

// const saveSession = req => new Promise((resolve, reject) => {
//   req.session.save((err) => {
//     if (err) return reject(err);
//     return resolve();
//   });
// });

const loginMiddleware = (req, res, next) => Promise.resolve()
  .then(async () => {
    const user = await authenticate(req, res, next);
    if (!user) {
      return res.send({
        responseCode: httpStatus.UNAUTHORIZED,
        responseMessage: 'We could not locate your account.'
      });
    }
    // if (!user.active) {
    //   return res.send({
    //     responseCode: httpStatus.UNAUTHORIZED,
    //     responseMessage:
    //         'You must confirm your account before logging in. Please check your email for the confirmation link.'
    //   });
    // }

    await login(req, user);
    // const temp = req.session.passport;

    // await regenerateSession(req);
    // req.session.passport = temp;

    // await saveSession(req);

    const body = { id: user.id, email: user.email };
    const token = jwt.sign({ user: body }, sessionKey);

    return res.send({
      responseCode: httpStatus.OK,
      responseMessage: { token }
    });
  })
  .catch(next);

module.exports = { loginMiddleware };
