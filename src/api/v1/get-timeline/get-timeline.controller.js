const httpStatus = require('http-status');
const { TileRange } = require('@models/');

/**
 * getTimeline
 * @public
 */
exports.getTimeline = async (req, res, next) => TileRange.findAll({
  attributes: ['firstyear', 'lastyear']
}).then((ranges) => {
  const response = ranges.map(r => Object.values(r.dataValues));
  res.status(httpStatus.OK);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response
  });
});
