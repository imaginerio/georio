//  authenticated.middleware.js
//  Project hpi
//
//  Created by Axis Maps on 6/18/2020, 10:59:28 PM
//

const httpStatus = require('http-status');

const authenticatedMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({
      responseCode: httpStatus.UNAUTHORIZED,
      responseMessage: 'Login required'
    });
  }
};

module.exports = {
  authenticatedMiddleware
};
