const httpStatus = require('http-status');
const makeParams = require('@services/make-params');
const { host } = require('@config/vars');
const { Style, Type, Layer } = require('@models');

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
        url: `http://${host || req.headers.host}/api/v1/get/tilejson/?start=${params.firstyear}&end=${params.lastyear}`,
        type: 'vector'
      }
    },
    sprite: 'mapbox://sprites/axismaps/cjvmx96894g8h1cmrayjddslz/d54dto65po428e2qwof244z46',
    glyphs: 'mapbox://fonts/axismaps/{fontstack}/{range}.pbf'
  };
  const thematicLayerIds = [];

  return Layer.findAll({
    attributes: ['id'],
    where: {
      base: false
    }
  }).then((layers) => {
    layers.forEach((l) => {
      const { id } = l;
      json.sources[id] = {
        url: `http://${host || req.headers.host}/api/v1/get/tilejson/${id}/?start=${params.firstyear}&end=${params.lastyear}`,
        type: 'vector'
      };
      thematicLayerIds.push(id);
    });

    return Style.findAll({
      order: ['order'],
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
        if (s.Type) {
          layer.id = s.Type.id + s.id;
          layer.source = thematicLayerIds.includes(s.Type.Layer.id) ? s.Type.Layer.id : 'composite';
          layer['source-layer'] = s.Type.Layer.id;
          layer.filter = [
            'all',
            ['<=', 'firstyear', params.firstyear],
            ['>=', 'lastyear', params.lastyear],
            ['==', 'type', s.Type.id]
          ];
        } else if (layer.type === 'background') {
          layer.id = 'background';
        }
        return layer;
      });

      res.status(httpStatus.OK);
      return res.json(json);
    });
  });
};
