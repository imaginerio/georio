/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

require('module-alias/register');
const tilebelt = require('@mapbox/tilebelt');
const ora = require('ora');
const makeTileRange = require('@services/make-tilerange');
const { Tile, Layer, TileRange } = require('@models/');

// const greaterExtent = [-95.5, 29.6, -95.2, 29.9];

const cache = async () => makeTileRange()
  .then(() => {
    const params = { order: [['base', 'DESC NULLS LAST']] };
    if (process.argv[2]) params.where = { title: process.argv[2] };
    return Layer.findAll(params);
  }).then(layers => TileRange.findAll()
    .then(async (ranges) => {
      for (const layer of layers) {
        await layer.getExtent()
          .then(async (extent) => {
            const [xmin, ymin, xmax, ymax] = extent;
            const tiles = [];
            for (let z = layer.minzoom; z <= 14; z += 1) {
              const minTile = tilebelt.pointToTile(xmin, ymax, z);
              const maxTile = tilebelt.pointToTile(xmax, ymin, z);
              for (let x = minTile[0]; x <= maxTile[0]; x += 1) {
                for (let y = minTile[1]; y <= maxTile[1]; y += 1) {
                  ranges.forEach((range) => {
                    const { firstyear, lastyear } = range.dataValues;
                    tiles.push({
                      z, x, y, firstyear, lastyear
                    });
                  });
                }
              }
            }
            let i = 0;
            const spinner = ora(`Caching ${layer.title}`).start();
            for (const t of tiles) {
              i += 1;
              spinner.text = `Caching ${layer.title} ${i}/${tiles.length}`;
              t.LayerId = layer.id;
              const tile = await Tile.findOne({ where: t });
              if (!tile || tile.updatedAt < layer.updatedAt) {
                Tile.makeTile(t, layer.dataValues);
              }
            }
            spinner.succeed();
          });
      }
    }));

cache();
