const AWS = require('aws-sdk');
const { Cache } = require('@models');

const s3 = new AWS.S3();

/**
 * UploadTile Service
 *
 */
const uploadTileService = (params, tile) => {
  s3.putObject({
    Bucket: 'tilecache.axismaps.io',
    Key: `highways-waterways/${params.z}/${params.x}/${params.y}.pbf`,
    Body: tile,
    ACL: 'public-read'
  }, (err) => {
    if (err) console.log(err, err.stack);
    else Cache.create(params);
  });
};

module.exports = uploadTileService;
