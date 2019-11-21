/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

require('module-alias/register');
const tilebelt = require('@mapbox/tilebelt');
const makeTileRange = require('@services/make-tilerange');
const { Tile, Layer, TileRange } = require('@models/');

const cache = async () => makeTileRange()
  .then(() => Tile.getLatest())
  .then(date => Layer.getUpdated(date || new Date())
    .then(updated => TileRange.findAll()
      .then(async (ranges) => {
        for (const layer of updated) {
          await layer.getExtent()
            .then(async (extent) => {
              const tiles = [];
              for (let z = 9; z <= 17; z += 1) {
                const minTile = tilebelt.pointToTile(extent[0], extent[3], z);
                const maxTile = tilebelt.pointToTile(extent[2], extent[1], z);
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
              for (const t of tiles) {
                await Tile.makeTile(t, layer.dataValues);
              }
            });
        }
      })));

cache();
