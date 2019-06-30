const { Cache } = require('@models');

/**
 * TileCache Middleware
 *
 */
const tileCacheMiddleware = (req, res, next) => Cache.check(req.params)
  .then((exists) => {
    if (exists) {
      const { z, x, y } = req.params;
      res.redirect(`https://s3.amazonaws.com/tilecache.axismaps.io/highways-waterways/${z}/${x}/${y}.pbf`);
    } else {
      next();
    }
  });

module.exports = {
  tileCacheMiddleware
};
