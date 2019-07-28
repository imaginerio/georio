const httpStatus = require('http-status');
const {
  Point,
  Line,
  Polygon,
  Type,
  Layer,
  Sequelize
} = require('@models');

const geoms = [Point, Line, Polygon];
const { Op } = Sequelize;

/**
 * nameSearch
 * @public
 */
exports.nameSearch = async (req, res, next) => {
  const records = geoms.map(g => g.findAll({
    where: {
      name: {
        [Op.iLike]: `%${req.params.string}%`
      }
    },
    include: {
      model: Type,
      include: {
        model: Layer
      }
    }
  }));
  return Promise.all(records).then((results) => {
    const response = [];
    results.forEach((r) => {
      r.forEach((f) => {
        response.push({
          id: f.id,
          name: f.name,
          type: f.Type.name,
          layer: f.Type.Layer.name
        });
      });
    });
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response
    });
  });
};
