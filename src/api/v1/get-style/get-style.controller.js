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
        url: `http://${req.headers.host}/api/v1/tiles/{z}/{x}/{y}.pbf`,
        type: 'vector'
      }
    }
  };

  return Style.findAll({
    where: {
      TypeId: {
        [Op.ne]: null
      }
    },
    attributes: ['style'],
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
      layer.id = s.Type.name.replace(' ', '-').toLowerCase();
      layer.source = 'composite';
      layer['source-layer'] = s.Type.Layer.name;
      layer.filter = [
        'all',
        ['<=', ['get', 'FirstYear'], 2018],
        ['>=', ['get', 'LastYear'], 2018],
        ['match', ['get', 'Type'], ['County Limit'], true, false]
      ];
      return layer;
    });

    res.status(httpStatus.OK);
    return res.json(json);
  });
};
