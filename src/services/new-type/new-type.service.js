const { Type } = require('@models');
/**
 * NewType Service
 *
 */
const newTypeService = (layer, name) => layer.getTypes().then((types) => {
  const type = types.find(t => t.name === name);
  if (type) return type;
  return Type.create({ name }).then(t => t.setLayer(layer));
});

module.exports = newTypeService;
