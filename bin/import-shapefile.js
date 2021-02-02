require('module-alias/register');
const importShapefile = require('@services/import-shapefile');
const { Layer, Sequelize } = require('@models');

const init = async () => {
  console.log(`Loading features from ${process.argv[2]}`);
  const title = process.argv[2].match(/\w*(?=(point|line|polys?)\.shp$)/gmi)[0];
  let geometry = process.argv[2].match(/(point|line|poly)/gmi)[0].toLowerCase();
  geometry = geometry.match(/poly/) ? 'polygon' : geometry;
  return Layer.findOne({
    where: {
      title: {
        [Sequelize.Op.iLike]: title
      },
      geometry
    }
  }).then(async (layer) => {
    let importLayer = layer;
    if (!layer) {
      const layerId = await Layer.newLayer({ title, geometry });
      importLayer = await Layer.findByPk(layerId);
    }
    return importShapefile(process.argv[2], importLayer);
  }).then(() => process.exit());
};

init();
