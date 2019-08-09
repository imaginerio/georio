const httpStatus = require('http-status');
const newFeature = require('@services/new-feature');

/**
 * feature
 * @public
 */

const create = async (req) => {
  if (!req.body.dataType || !req.body.type) return null;
  return newFeature(req.body.geometry, req.body.dataType, req.body.type, req.body.data);
};

const paths = { create };

exports.feature = async (req, res, next) => paths[req.params.action](req)
  .then((result) => {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: result
    });
  }).catch((e) => {
    console.log(e);
    console.log(req.body);
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'ERROR',
      response: e
    });
  });
