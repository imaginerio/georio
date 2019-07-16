const httpStatus = require('http-status');
const {
  Layer, Type, Point, Line, Polygon, Sequelize
} = require('@models');
const makeParamsService = require('@services/make-params');

const { Op } = Sequelize;
const geoms = [Point, Line, Polygon];

/**
 * getLegend
 * @public
 */
exports.getLegend = async (req, res, next) => {
  const params = makeParamsService(req);
  const records = geoms.map(g => g.findAll({
    attributes: ['TypeId'],
    where: {
      firstyear: {
        [Op.lte]: params.firstyear
      },
      lastyear: {
        [Op.gte]: params.lastyear
      }
    },
    group: ['TypeId']
  }));
  return Promise.all(records).then((features) => {
    const types = [];
    features.forEach(f => f.forEach(g => types.push(g.TypeId)));
    return Layer.findAll({
      attributes: ['id', 'geometry', 'name', 'title', 'base'],
      include: [{
        model: Type,
        attributes: ['name', ['name', 'title']],
        where: {
          id: types
        }
      }]
    }).then((layers) => {
      res.status(httpStatus.OK);
      return res.json({
        responseCode: httpStatus.OK,
        responseMessage: 'OK',
        response: { layers }
      });
    });
  });
};
