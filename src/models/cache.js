const AWS = require('aws-sdk');
const makeParams = require('@services/make-params');

const s3 = new AWS.S3();

module.exports = (sequelize, DataTypes) => {
  const Cache = sequelize.define('Cache', {
    z: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    layer: DataTypes.STRING
  }, {});

  Cache.check = where => Cache.findOne({ where });

  Cache.upload = (req, pbf) => {
    const params = makeParams(req);
    params.layer = params.layer || 'base';
    const {
      layer,
      firstyear,
      lastyear,
      z,
      x,
      y
    } = params;
    if (pbf.toString().length > 0) {
      const putObjectPromise = s3.putObject({
        Bucket: 'tilecache.axismaps.io',
        Key: `highways-waterways/${layer}/${firstyear}-${lastyear}/${z}/${x}/${y}.pbf`,
        ACL: 'public-read',
        Body: pbf
      }).promise();
      return putObjectPromise.then(() => Cache.create(params));
    }
    return Promise.resolve();
  };

  return Cache;
};
