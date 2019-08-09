const httpStatus = require('http-status');
const makeParams = require('@services/make-params');
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
exports.tileJSON = async (req, res, next) => Layer.getBaseLayers()
  .then((layers) => {
    const vector_layers = layers.map(l => ({ // eslint-disable-line camelcase
      id: l.id,
      description: l.title,
      fields
    }));
    const params = makeParams(req);
    res.status(httpStatus.OK);
    return res.json({
      tilejson: '3.0.0',
      tiles: [`http://${req.headers.host}/api/v1/tiles/{z}/{x}/{y}.pbf?start=${params.firstyear}&end=${params.lastyear}`],
      bounds: [-96, 29, -94, 30],
      minZoom: 9,
      maxZoom: 17,
      vector_layers
    });
  });
