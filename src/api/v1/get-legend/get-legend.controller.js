const httpStatus = require('http-status');
const makeParamsService = require('@services/make-params');
const makeSwatchService = require('@services/make-swatch');
const {
  Layer, Type, Point, Line, Polygon, Style, Sequelize
} = require('@models');

const { Op } = Sequelize;
const geoms = [Point, Line, Polygon];

/**
 * getLegend
 * @public
 */
exports.getLegend = async (req, res, next) => {
  const params = makeParamsService(req);
  let base = true;
  if (req.params.include === 'thematic') base = [false, null];
  if (req.params.include === 'all') base = [true, false, null];
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
      attributes: ['id', 'geometry', 'title', 'base', 'slider'],
      where: { base },
      include: [{
        model: Type,
        attributes: ['id', 'title'],
        order: ['order'],
        where: {
          id: types
        },
        include: [{
          model: Style,
          attributes: ['style']
        }]
      }]
    }).then((layers) => {
      const legend = layers.map((l) => {
        const layer = l.dataValues;
        layer.Types = layer.Types.map((t) => {
          const type = t.dataValues;
          type.swatch = makeSwatchService(type.Styles) || '#cccccc';
          delete type.Styles;
          return type;
        });
        return layer;
      });

      res.status(httpStatus.OK);
      return res.json({
        responseCode: httpStatus.OK,
        responseMessage: 'OK',
        response: { legend }
      });
    });
  });
};
