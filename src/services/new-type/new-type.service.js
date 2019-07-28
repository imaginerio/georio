const { Type } = require('@models');
/**
 * NewType Service
 *
 */
const newTypeService = (layer, title) => layer.getTypes().then((types) => {
  const type = types.find(t => t.title === title);
  if (type) return type;
  return Type.create({
    title,
    name: title.replace(' ', '-').toLowerCase()
  }).then(t => t.setLayer(layer));
});

module.exports = newTypeService;
