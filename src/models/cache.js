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

  Cache.check = where => Cache.findOne({ where }).then((c) => {
    if (c) return true;
    return false;
  });

  Cache.upload = (req, pbf) => {
    const params = makeParams(req);
    const {
      firstyear,
      lastyear,
      z,
      x,
      y
    } = params;
    const putObjectPromise = s3.putObject({
      Bucket: 'tilecache.axismaps.io',
      Key: `highways-waterways/${firstyear}-${lastyear}/${z}/${x}/${y}.pbf`,
      ACL: 'public-read',
      Body: pbf
    }).promise();
    return putObjectPromise.then(() => Cache.create(params));
  };

  return Cache;
};
