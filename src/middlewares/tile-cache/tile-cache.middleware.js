const makeParams = require('@services/make-params/');
const { Cache } = require('@models');

/**
 * TileCache Middleware
 *
 */
const tileCacheMiddleware = (req, res, next) => {
  const params = makeParams(req);
  return Cache.check(params)
    .then((exists) => {
      if (exists) {
        const {
          z,
          x,
          y,
          firstyear,
          lastyear,
          layer
        } = exists.dataValues;
        return res.redirect(`https://s3.amazonaws.com/tilecache.axismaps.io/highways-waterways/${layer}/${firstyear}-${lastyear}/${z}/${x}/${y}.pbf`);
      }
      return next();
    });
};

module.exports = {
  tileCacheMiddleware
};
