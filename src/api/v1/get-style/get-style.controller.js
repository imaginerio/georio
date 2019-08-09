const httpStatus = require('http-status');
const makeParams = require('@services/make-params');
const {
  Style, Type, Layer, Sequelize
} = require('@models');

const { Op } = Sequelize;

/**
 * getStyle
 * @public
 */
exports.getStyle = async (req, res, next) => {
  const params = makeParams(req);
  const json = {
    version: 8,
    name: 'Highways & Waterways',
    center: [-95.36083536331756, 29.74519993868978],
    zoom: 12,
    bearing: 0,
    pitch: 0,
    sources: {
      composite: {
        url: `http://${req.headers.host}/api/v1/tilejson/?start=${params.firstyear}&end=${params.lastyear}`,
        type: 'vector'
      }
    },
    sprite: 'mapbox://sprites/axismaps/cjvmx96894g8h1cmrayjddslz/d54dto65po428e2qwof244z46',
    glyphs: 'mapbox://fonts/axismaps/{fontstack}/{range}.pbf'
  };

  return Style.findAll({
    where: {
      TypeId: {
        [Op.ne]: null
      }
    },
    attributes: ['id', 'style'],
    include: [{
      model: Type,
      attributes: ['id'],
      include: [{
        model: Layer,
        attributes: ['id']
      }]
    }]
  }).then((styles) => {
    json.layers = styles.map((s) => {
      const layer = s.style;
      layer.id = s.Type.id + s.id;
      layer.source = 'composite';
      layer['source-layer'] = s.Type.Layer.id;
      layer.filter = [
        'all',
        ['<=', 'firstyear', params.firstyear],
        ['>=', 'lastyear', params.lastyear],
        ['==', 'type', s.Type.id]
      ];
      return layer;
    });

    res.status(httpStatus.OK);
    return res.json(json);
  });
};
