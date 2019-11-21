const httpStatus = require('http-status');
const makeParams = require('@services/make-params');
const { host } = require('@config/vars');
const { Layer } = require('@models');

const fields = {
  id: 'Number',
  type: 'String',
  firstyear: 'Number',
  lastyear: 'Number'
};

/**
 * tileJSON
 * @public
 */
exports.tileJSON = async (req, res, next) => {
  let layers = [];
  if (req.params.layer) {
    layers = await Layer.findAll({
      attributes: ['id', 'title', 'geometry', 'minzoom'],
      where: {
        id: req.params.layer
      }
    });
  } else {
    layers = await Layer.getBaseLayers();
  }
  const vector_layers = layers.map(l => ({ // eslint-disable-line camelcase
    id: l.id,
    description: l.title,
    fields
  }));
  const params = makeParams(req);
  res.status(httpStatus.OK);
  return res.json({
    tilejson: '3.0.0',
    tiles: [`http://${host || req.headers.host}/api/v1/tiles/{z}/{x}/{y}.pbf?start=${params.firstyear}&end=${params.lastyear}`],
    minZoom: 9,
    maxZoom: 17,
    vector_layers
  });
};
