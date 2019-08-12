const httpStatus = require('http-status');
const _ = require('underscore');
const makeParamsService = require('@services/make-params');
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
 * search
 * @public
 */
exports.probe = async (req, res, next) => {
  const params = makeParamsService(req);
  const { location } = req.params;
  let geom = Sequelize.fn('ST_SetSRID', Sequelize.fn('ST_MakePoint', ...location), 4326);
  if (location.length === 4) geom = Sequelize.fn('ST_MakeEnvelope', ...location, 4326);
  const records = geoms.map(g => g.findAll({
    attributes: ['id', 'name'],
    where: {
      geom: {
        [Op.overlap]: geom
      },
      name: {
        [Op.not]: null
      },
      firstyear: {
        [Op.lte]: params.firstyear
      },
      lastyear: {
        [Op.gte]: params.lastyear
      }
    },
    include: {
      model: Type,
      attributes: [],
      include: {
        attributes: ['id'],
        model: Layer,
        where: {
          base: true
        }
      }
    },
    raw: true
  }));

  return Promise.all(records).then((results) => {
    let response = [];
    results.forEach((r) => {
      r.forEach((f) => {
        if (f['Type.Layer.id']) {
          response.push({
            id: f.id,
            name: f.name,
            layer: f['Type.Layer.id']
          });
        }
      });
    });
    response = _.groupBy(response, 'layer');
    response = _.mapObject(response, m => _.map(m, m1 => _.omit(m1, 'layer')));
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response
    });
  });
};
