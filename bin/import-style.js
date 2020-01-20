require('module-alias/register');
const fs = require('fs');
const _ = require('underscore');
const { Layer, Style, Sequelize } = require('@models');

const { Op } = Sequelize;

const init = async () => {
  await Style.destroy({ truncate: true });
  const style = JSON.parse(fs.readFileSync(process.argv[2])).layers;
  style.forEach(async (s, i) => {
    const sourceLayer = s['source-layer'];
    if (sourceLayer && sourceLayer.match(/(point|line|poly)/gmi)) {
      const layer = await Layer.findOne({
        where: {
          title: {
            [Op.iLike]: sourceLayer.replace(/(point|line|poly)/gmi, '')
          },
          geometry: {
            [Op.iLike]: `${sourceLayer.match(/(point|line|poly)/gmi)[0]}%`
          }
        }
      });
      if (layer) {
        const types = await layer.getTypes();
        const json = s;
        if (json.layout['text-field'] && json.layout['text-field'][1][1] === 'Name') json.layout['text-field'][1][1] = 'name';
        const minzoom = getMinZoom(json);
        if (minzoom < Infinity && (minzoom < layer.minzoom || !layer.minzoom)) await layer.update({ minzoom });

        const filter = s.filter.find(f => f[1] && f[1][1] === 'Type');
        if (filter) {
          const type = types.find(t => t.title === filter[2][0]);
          if (type) {
            await Style.create({
              style: _.pick(json, 'type', 'layout', 'paint'),
              order: i,
              TypeId: type.id
            });
          } else {
            console.log(filter);
          }
        } else {
          types.forEach(async (t) => {
            await Style.create({
              style: _.pick(json, 'type', 'layout', 'paint'),
              order: i,
              TypeId: t.id
            });
          });
        }
      }
    }
  });
  // process.exit();
};

const getMinZoom = (style) => {
  const testStyle = (paint) => {
    let min = Infinity;
    const flat = _.flatten(_.values(paint));
    flat.forEach((p, i) => {
      if (p === 'zoom') {
        min = Math.min(min, Math.ceil(flat[i + 1]));
      }
    });
    return min;
  };
  return Math.min(testStyle(style.paint), testStyle(style.layout));
};

init();
