const { omit } = require('underscore');
const findFeature = require('@services/find-feature');
const makeFeature = require('@services/new-feature');
const { sequelize } = require('@models/');

/**
 * UpdateFeature Service
 *
 */
const updateFeatureService = req => findFeature(req.params.id).then(async (feature) => {
  if (feature) {
    const edit = await feature.getEditedFeature();
    const original = await feature.getOriginalFeature();
    const user = await feature.getUser();
    const params = omit(req.body.properties, 'type', 'approved');
    if (!edit && !original && (!user || user.id === req.user.id)) {
      params.edited = req.user.id;
      params.original = req.params.id;
      params.type = req.body.properties.type;
      const data = {
        properties: omit(params, 'geom'),
        geometry: req.body.geometry
      };
      return makeFeature({ dataType: 'geojson', data }).then(async (newFeature) => {
        await feature.setUser(req.user.id);
        return newFeature.id;
      });
    }

    params.geom = sequelize.fn('ST_SetSRID', sequelize.fn('ST_Multi', sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(req.body.geometry))), 4326);
    params.TypeId = req.body.properties.type;
    if (edit && user.id === req.user.id) {
      return edit.update(params).then(f => f.id);
    }
    if (original && user.id === req.user.id) {
      return feature.update(params).then(f => f.id);
    }
    return Promise.reject(new Error('Cannot edit. User conflict.'));
  }
  return Promise.reject(new Error('Invalid feature ID'));
});

module.exports = updateFeatureService;
