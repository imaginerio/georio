const makeParams = require('@services/make-params');
const { Layer, Tile, Cache } = require('@models');

/**
 * tiles
 * @public
 */
exports.tiles = async (req, res, next) => {
  let allLayers = [];
  if (req.params.layer) {
    allLayers = await Layer.findAll({
      attributes: ['id', 'title', 'geometry', 'minzoom'],
      where: {
        id: req.params.layer
      }
    });
  } else {
    allLayers = await Layer.getBaseLayers();
  }
  const params = makeParams(req);
  const layers = allLayers.filter(l => l.minzoom <= params.z);
  const records = layers.map(l => Tile.getTile(params, l));
  return Promise.all(records).then((tiles) => {
    const mvts = tiles.filter(t => t).map(t => t.mvt);
    res.setHeader('Content-Type', 'application/x-protobuf');
    if (mvts.length === 0) return res.sendStatus(204);
    const pbf = Buffer.concat(mvts);
    res.send(pbf);
    return Cache.upload(req, pbf);
  }).catch((e) => {
    console.log(e);
    res.sendStatus(500);
  });
};
