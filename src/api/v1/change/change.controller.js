const getChange = require('@services/get-changeset');
const httpStatus = require('http-status');

/**
 * change
 * @public
 */
exports.change = async (req, res, next) => getChange(null, req.params.id).then((changeset) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: changeset[0].changes[0]
  });
}).catch((e) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  return res.json({
    responseCode: httpStatus.INTERNAL_SERVER_ERROR,
    responseMessage: 'ERROR',
    response: e.message
  });
});
