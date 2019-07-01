const tiles = require('@services/make-tile');
const uploadTile = require('@services/upload-tile');
const makeParams = require('@services/make-params');
const { Layer } = require('@models');

/**
 * tiles
 * @public
 */
exports.tiles = async (req, res, next) => Layer.getLayers()
  .then((allLayers) => {
    const params = makeParams(req);
    const layers = allLayers.filter(l => l.minzoom <= params.z);
    const records = layers.map(l => tiles(params, l).then(tile => tile[0].mvt));
    return Promise.all(records).then((mvts) => {
      res.setHeader('Content-Type', 'application/x-protobuf');
      if (mvts.length === 0) return res.sendStatus(204);
      const pbf = Buffer.concat(mvts);
      uploadTile(params, pbf);
      return res.send(pbf);
    }).catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
  });
