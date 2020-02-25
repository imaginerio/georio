/* eslint-disable consistent-return */
const shp = require('shapefile');
const ora = require('ora');
const newVisual = require('@services/new-visual');

/**
 * ImportVisual Service
 *
 */
const importVisualService = (file, visual) => shp.open(file)
  .then((source) => {
    let i = 0;
    const spinner = ora(`Loading ${file} ${i}`).start();
    return source.read()
      .then(async function log(result) {
        if (result.done) {
          spinner.succeed();
          return;
        }
        const { properties, geometry } = result.value;
        if (properties.firstyear && properties.lastyear && properties.firstyear <= properties.lastyear) {
          i += 1;
          spinner.text = `Loading ${file} ${i}`;
          properties.remoteid = properties.ss_id;
          await newVisual({
            properties,
            geometry,
            visual
          });
        }
        return source.read().then(log);
      });
  });

module.exports = importVisualService;
