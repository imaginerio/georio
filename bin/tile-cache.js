/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

require('module-alias/register');
const tilebelt = require('@mapbox/tilebelt');
const ora = require('ora');
const makeTileRange = require('@services/make-tilerange');
const { Tile, Layer, TileRange } = require('@models/');

const greaterExtent = [-95.5, 29.6, -95.2, 29.9];

const cache = async () => makeTileRange()
  .then(() => Layer.findAll({ order: [['base', 'DESC NULLS LAST']] }))
  .then(layers => TileRange.findAll()
    .then(async (ranges) => {
      for (const layer of layers) {
        await layer.getExtent()
          .then(async (extent) => {
            const xmin = Math.max(extent[0], greaterExtent[0]);
            const ymin = Math.max(extent[1], greaterExtent[1]);
            const xmax = Math.min(extent[2], greaterExtent[2]);
            const ymax = Math.min(extent[3], greaterExtent[3]);
            const tiles = [];
            for (let z = Math.max(10, layer.minzoom); z <= 17; z += 1) {
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
              const tile = await Tile.findOne({ where: t });
              if (!tile || tile.updatedAt < layer.updatedAt) {
                await Tile.makeTile(t, layer.dataValues);
              }
            }
            spinner.succeed();
          });
      }
    }));

cache();
