const httpStatus = require('http-status');
const { Layer } = require('@models');

const fields = {
  id: 'Number',
  type: 'String',
  name: 'String',
  firstyear: 'Number',
  lastyear: 'Number'
};

/**
 * tileJSON
 * @public
 */
exports.tileJSON = async (req, res, next) => Layer.getBaseLayers()
  .then((layers) => {
    const vector_layers = layers.map(l => ({ // eslint-disable-line camelcase
      id: l.name,
      fields
    }));
    res.status(httpStatus.OK);
    return res.json({
      tilejson: '3.0.0',
      tiles: ['http://localhost:5000/api/v1/tiles/{z}/{x}/{y}.pbf'],
      bounds: [-96, 29, -94, 30],
      minZoom: 9,
      maxZoom: 17,
      vector_layers
    });
  });
