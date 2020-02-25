require('module-alias/register');
const importVisual = require('@services/import-visual');
const { Visual } = require('@models');

const init = async () => {
  console.log(`Loading features from ${process.argv[2]}`);
  const title = process.argv[2].replace(/.*\/(\w*)(exent)?spoly\.shp/gm, `$1s`);
  return Visual.findOne({
    where: { title }
  }).then(async (layer) => {
    const visual = layer || await Visual.create({ title });
    return importVisual(process.argv[2], visual);
  }).then(() => process.exit());
};

init();
