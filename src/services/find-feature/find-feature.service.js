const { Point, Line, Polygon } = require('@models/');

/**
 * FindFeature Service
 *
 */
const findFeatureService = async (id) => {
  let feature = await Polygon.findByPk(id);
  if (feature) return feature;

  feature = await Line.findByPk(id);
  if (feature) return feature;

  feature = await Point.findByPk(id);
  return feature;
};

module.exports = findFeatureService;
