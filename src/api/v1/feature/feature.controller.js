const httpStatus = require('http-status');
const { omit } = require('underscore');
const newFeature = require('@services/new-feature');
const getFeatures = require('@services/get-features');
const findFeature = require('@services/find-feature');
const { sequelize } = require('@models/');

/**
 * feature
 * @public
 */
exports.read = async (req, res, next) => {
  if (req.params.id) {
    return getFeatures(req.params.id, req.user).then((geojson) => {
      res.status(httpStatus.OK);
      return res.send(geojson);
    }).catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      return res.json({
        responseCode: httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage: err
      });
    });
  }
  return res.sendStatus(httpStatus.NOT_FOUND);
};

exports.create = async (req, res, next) => newFeature({ dataType: 'geojson', data: req.body })
  .then((result) => {
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response: result.id
    });
  }).catch((e) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    return res.json({
      responseCode: httpStatus.INTERNAL_SERVER_ERROR,
      responseMessage: 'ERROR',
      response: e.message
    });
  });

exports.update = async (req, res, next) => findFeature(req.params.id).then(async (feature) => {
  if (feature) {
    const params = omit(req.body.properties, 'type');
    params.geom = sequelize.fn('ST_Multi', sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(req.body.geometry)));
    params.TypeId = req.body.properties.type;
    return feature.update(params, { logging: console.log })
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

exports.delete = async (req, res, next) => findFeature(req.params.id).then(async (feature) => {
  if (feature) {
    return feature.destroy()
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
