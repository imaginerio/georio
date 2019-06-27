const { Layer } = require('@models');

/**
 * NewLayer Service
 *
 */
const newLayerService = (name, geometry) => Layer.findOne({
  where: { name, geometry }
}).then((layer) => {
  if (layer) return layer;
  return Layer.create({ name, geometry });
});

module.exports = newLayerService;
