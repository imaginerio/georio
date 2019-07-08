const httpStatus = require('http-status');
const { Layer, Type } = require('@models');

/**
 * getLayers
 * @public
 */
exports.getLayers = async (req, res, next) => Layer.findAll({
  attributes: ['title', 'name', 'geometry', 'base'],
  include: [{
    model: Type,
    attributes: ['name']
  }]
}).then((layers) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: layers
  });
});
