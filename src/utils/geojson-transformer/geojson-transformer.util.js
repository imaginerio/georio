/* eslint-disable func-names */
const through = require('through');

/**
 * GeojsonTransformer Utility
 *
 */
const geojsonTransformerUtil = through(function (d) {
  let doc = JSON.parse(d.toString());
  doc = doc.map((f) => {
    const feat = f;
    const feature = { type: 'Feature' };
    feature.geometry = feat.geom;
    delete feat.geom;
    feature.properties = feat;
    return feature;
  });
  this.queue(doc);
}, function end() {
  this.queue(null);
});

module.exports = geojsonTransformerUtil;
