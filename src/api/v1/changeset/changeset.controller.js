const httpStatus = require('http-status');
const createChangeset = require('@services/create-changeset');
const getChangeset = require('@services/get-changeset');
const updateChangeset = require('@services/update-changeset');

/**
 * changeset
 * @public
 */
exports.create = async (req, res, next) => createChangeset(req.user, req.body.title).then((changeset) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: changeset
  });
}).catch((e) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  return res.json({
    responseCode: httpStatus.INTERNAL_SERVER_ERROR,
    responseMessage: 'ERROR',
    response: e.message
  });
});

exports.read = async (req, res, next) => getChangeset(req.params.id).then((changeset) => {
  console.log(req.user);
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: changeset
  });
}).catch((e) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  return res.json({
    responseCode: httpStatus.INTERNAL_SERVER_ERROR,
    responseMessage: 'ERROR',
    response: e.message
  });
});

exports.update = async (req, res, next) => updateChangeset(req.body.changes).then((changeset) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: changeset
  });
}).catch((e) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR);
  return res.json({
    responseCode: httpStatus.INTERNAL_SERVER_ERROR,
    responseMessage: 'ERROR',
    response: e.message
  });
});
