const httpStatus = require('http-status');
const geojsonStream = require('geojson-stream');
const transformer = require('@utils/geojson-transformer');
const { Layer } = require('@models/');

/**
 * getFeatures
 * @public
 */
exports.getFeatures = async (req, res, next) => Layer.findByPk(req.params.layer)
  .then((layer) => {
    if (layer) {
      const stream = layer.getGeo();
      return stream
        .pipe(transformer)
        .pipe(geojsonStream.stringify())
        .pipe(res);
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'Layer not found'
    });
  });
