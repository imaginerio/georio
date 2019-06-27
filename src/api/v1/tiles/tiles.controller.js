const tiles = require('@services/make-tile');

/**
 * tiles
 * @public
 */
exports.tiles = async (req, res, next) => {
  tiles(req.params, 'Lines', ['firstyear', 'lastyear', 'name']).then((tile) => {
    res.setHeader('Content-Type', 'application/x-protobuf');
    if (tile.length === 0) return res.sendStatus(204);
    return res.send(tile[0].mvt);
  });
};
