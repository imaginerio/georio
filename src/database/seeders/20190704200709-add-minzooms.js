require('module-alias/register');
const fs = require('fs');
const path = require('path');
const { Layer, Type } = require('@models');

module.exports = {
  up: () => {
    const json = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/metadata.json'))
    );
    return Layer.findAll({ include: Type }).then((layers) => {
      const records = [];
      layers.forEach((l) => {
        if (json[l.name]) {
          const { minzoom, types, base } = json[l.name];
          records.push(l.update({ minzoom, base }));
          if (types) {
            l.Types.forEach((t) => {
              if (types[t.name]) {
                records.push(t.update({ minzoom: types[t.name] }));
              }
            });
          }
        }
      });
      return Promise.all(records);
    });
  },

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return Layer.update(
      { minzoom: null, base: null },
      { where: { minzoom: { [Op.ne]: null } } }
    ).then(() => Type.update(
      { minzoom: null },
      { where: { minzoom: { [Op.ne]: null } } }
    ));
  }
};
