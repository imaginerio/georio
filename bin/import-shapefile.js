require('module-alias/register');
const importShapefile = require('@services/import-shapefile');
const { Layer } = require('@models');

const init = async () => {
  console.log(`Loading features from ${process.argv[2]}`);
  const title = process.argv[2].match(/\w*(?=(point|line|polys?)\.shp$)/gm)[0];
  let geometry = process.argv[2].match(/(point|line|poly)/)[0];
  geometry = geometry.match(/poly/) ? 'polygon' : geometry;
  return Layer.findOne({
    where: { title, geometry }
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
