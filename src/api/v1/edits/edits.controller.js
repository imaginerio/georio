const httpStatus = require('http-status');
const { Point, Line, Polygon } = require('@models');


/**
 * edits
 * @public
 */
exports.edits = async (req, res, next) => Promise.all([Point, Line, Polygon].map(model => model.count({
  where: {
    edited: req.user.id,
    ChangesetId: null
  }
}))).then((counts) => {
  const response = counts.reduce((memo, n) => memo + n, 0);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response
  });
});
