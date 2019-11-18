const through = require('through');

/**
 * GeojsonTransformer Utility
 *
 */
const geojsonTransformerUtil = through((d) => {
  const doc = JSON.parse(d.toString());
  const feature = { type: 'Feature' };
  feature.geometry = doc.geom;
  delete doc.geom;
  feature.properties = doc;
  geojsonTransformerUtil.queue(feature);
});

module.exports = geojsonTransformerUtil;
