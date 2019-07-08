const httpStatus = require('http-status');
const {
  Style, Type, Layer, Sequelize
} = require('@models');

const { Op } = Sequelize;

/**
 * getStyle
 * @public
 */
exports.getStyle = async (req, res, next) => {
  const json = {
    version: 8,
    name: 'Highways & Waterways',
    center: [-95.36083536331756, 29.74519993868978],
    zoom: 12,
    bearing: 0,
    pitch: 0,
    sources: {
      composite: {
        url: `http://${req.headers.host}/api/v1/tilejson/`,
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
      attributes: ['name'],
      include: [{
        model: Layer,
        attributes: ['name']
      }]
    }]
  }).then((styles) => {
    json.layers = styles.map((s) => {
      const layer = s.style;
      layer.id = `${s.Type.name.replace(' ', '-').toLowerCase()}${s.id}`;
      layer.source = 'composite';
      layer['source-layer'] = s.Type.Layer.name;
      layer.filter = [
        'all',
        ['<=', 'firstyear', 2018],
        ['>=', 'lastyear', 2018],
        ['==', 'type', s.Type.name]
      ];
      return layer;
    });

    res.status(httpStatus.OK);
    return res.json(json);
  });
};
