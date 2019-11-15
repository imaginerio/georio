const httpStatus = require('http-status');
const newFeature = require('@services/new-feature');

/**
 * feature
 * @public
 */

exports.feature = async (req, res, next) => newFeature(req.body)
  .then((result) => {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: result
    });
  }).catch((e) => {
    console.log(req.body);
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'ERROR',
      response: e.message
    });
  });
