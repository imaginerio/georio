const httpStatus = require('http-status');
const { Layer, Type } = require('@models/');

/**
 * updateFeature
 * @public
 */
exports.updateFeature = async (req, res, next) => Layer.findByPk(req.params.layer)
  .then(async (layer) => {
    if (layer) {
      const model = await layer.getGeomModel();
      return model.findByPk(req.params.id)
        .then(async (feature) => {
          if (feature) {
            if (req.body.type) {
              const type = await Type.findByPk(req.body.type);
              if (type) await feature.setType(type);
            }

            return feature.update(req.body)
              .then(() => {
                res.status(httpStatus.OK);
                return res.json({
                  responseCode: httpStatus.OK,
                  responseMessage: 'OK'
                });
              });
          }
          res.status(httpStatus.INTERNAL_SERVER_ERROR);
          return res.json({
            responseCode: httpStatus.INTERNAL_SERVER_ERROR,
            responseMessage: 'Invalid feature ID'
          });
        });
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'Invalid layer ID'
    });
  });
