require('module-alias/register');
const tilebelt = require('@mapbox/tilebelt');
const { Tile, Layer } = require('@models/');

const cache = async () => Tile.getLatest()
  .then(date => Layer.getUpdated(date || new Date()))
  .then((updated) => {
    updated.forEach(async (layer) => {
      await layer.getExtent()
        .then(async (extent) => {
          for (let z = 9; z <= 17; z += 1) {
            const minTile = tilebelt.pointToTile(extent[0], extent[3], z);
            const maxTile = tilebelt.pointToTile(extent[2], extent[1], z);
            for (let x = minTile[0]; x <= maxTile[0]; x += 1) {
              for (let y = minTile[1]; y <= maxTile[1]; y += 1) {
                // eslint-disable-next-line no-await-in-loop
                await Tile.makeTile({
                  z,
                  x,
                  y,
                  firstyear: 2019,
                  lastyear: 2019
                }, layer.dataValues);
              }
            }
          }
        });
    });
  });

cache();
