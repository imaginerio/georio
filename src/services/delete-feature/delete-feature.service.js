const findFeature = require('@services/find-feature');

/**
 * DeleteFeature Service
 *
 */
const deleteFeatureService = req => findFeature(req.params.id).then(async (featureRaw) => {
  let feature = featureRaw;
  if (feature) {
    if (feature.edited) {
      if (feature.edited !== req.user.id) {
        return Promise.reject(new Error('Feature is locked for editing'));
      }
      const edit = await feature.getEditedFeature();
      if (edit) await edit.destroy();

      const original = await feature.getOriginalFeature();
      if (original) feature = original;
    }
    return feature.update({
      toDelete: true,
      edited: req.user.id
    });
  }
  return Promise.reject(new Error('Feature not found.'));
});

module.exports = deleteFeatureService;
