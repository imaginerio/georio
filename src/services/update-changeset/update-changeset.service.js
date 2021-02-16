const { pick } = require('underscore');
const findFeature = require('@services/find-feature');

/**
 * UpdateChangeset Service
 *
 */
const updateChangesetService = changes => Promise.all(changes.map(change => findFeature(change.id).then(async (feature) => {
  const edit = await feature.getEditedFeature() || feature;
  const original = await feature.getOriginalFeature() || feature;
  if (change.approved) {
    if (original) await original.destroy();
    if (feature.toDelete) return feature.destroy();
    if (edit) {
      return edit.update({
        approved: true,
        edited: null
      });
    }
  }
  if (edit) {
    await edit.destroy();
  }
  if (original) {
    return original.update({
      edited: null,
      toDelete: null
    });
  }
  return Promise.resolve();
}))).then(features => features.map(feature => ({
  id: feature.id,
  type: 'Feature',
  properties: {
    ...pick(feature, ['name', 'firstyear', 'lastyear', 'tags', 'approved']),
    type: feature.TypeId
  },
  geometry: feature.geom
})));

module.exports = updateChangesetService;
