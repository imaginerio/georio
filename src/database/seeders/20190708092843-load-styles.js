require('module-alias/register');
const fs = require('fs');
const path = require('path');
const {
  Style, Type, Layer, Sequelize
} = require('@models');

const { Op } = Sequelize;

module.exports = {
  up: () => {
    const { layers } = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/style.json'))
    );
    let order = 0;
    const records = [];
    layers.forEach((l) => {
      if (l.filter) {
        const typeFilter = l.filter.find(f => Array.isArray(f) && f[0] === 'match');
        const name = typeFilter[2][0];
        records.push(
          Type.findOne({
            where: { name },
            attributes: ['id'],
            include: [{
              model: Layer,
              where: {
                name: {
                  [Op.iLike]: `${l['source-layer']}%`
                }
              }
            }]
          }).then((type) => {
            const style = {
              type: l.type,
              minzoom: l.minzoom,
              layout: l.layout,
              paint: l.paint
            };
            const TypeId = type ? type.id : null;
            return Style.create({ order, style, TypeId })
              .catch((e) => {
                console.log(e);
              });
          })
        );
        order += 1;
      }
    });
    return Promise.all(records);
  },

  down: queryInterface => queryInterface.bulkDelete('Styles')
};
