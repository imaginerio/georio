const httpStatus = require('http-status');
const newFeature = require('@services/new-feature');

/**
 * createFeature
 * @public
 */
exports.createFeature = async (req, res, next) => {
  newFeature(req.params.geom, req.params.type, req.body)
    .then((feat) => {
      if (feat) res.status(httpStatus.OK);
      else res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json({
        responseCode: httpStatus.OK,
        responseMessage: 'OK',
        response: {}
      });
    });
};
