const { Layer } = require('@models');

/**
 * NewLayer Service
 *
 */
const newLayerService = name => Layer.findOne({
  where: { name }
}).then((layer) => {
  if (layer) return layer;
  return Layer.create({ name });
});

module.exports = newLayerService;
