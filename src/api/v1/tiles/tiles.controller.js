const tiles = require('@services/make-tile');
const { Layer } = require('@models');

/**
 * tiles
 * @public
 */
exports.tiles = async (req, res, next) => Layer.getLayers()
  .then((layers) => {
    const records = layers.map(l => tiles(req.params, l).then(tile => tile[0].mvt));
    return Promise.all(records).then((mvts) => {
      res.setHeader('Content-Type', 'application/x-protobuf');
      // if (tile.length === 0) return res.sendStatus(204);
      return res.send(Buffer.concat(mvts));
    }).catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
  });
