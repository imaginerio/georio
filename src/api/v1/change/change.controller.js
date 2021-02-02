const httpStatus = require('http-status');
const { Change } = require('@models/');

/**
 * change
 * @public
 */
exports.update = async (req, res, next) => {
  if (req.params.id) {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: {}
    });
  }
  return Change.createChange(req.body).then((response) => {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response
    });
  }).catch(() => res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR));
};

exports.read = async (req, res, next) => Change.getChanges(req.params ? req.params.id : null).then((response) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response
  });
});

exports.delete = async (req, res, next) => Change.findByPk(req.params.id).then(async (change) => {
  if (change) {
    await change.destroy();
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: 'Change deleted'
    });
  }
  return res.sendStatus(httpStatus.NOT_FOUND);
});
