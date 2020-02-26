const httpStatus = require('http-status');
const _ = require('underscore');
const makeParams = require('@services/make-params');
const { sequelize, Visual, Document } = require('@models');

const { Op } = sequelize;

/**
 * getVisual
 * @public
 */
exports.getVisual = async (req, res, next) => {
  const params = makeParams(req);
  return Visual.findAll({
    attributes: ['id', 'title'],
    raw: true
  }).then(visuals => Document.findAll({
    attributes: [
      'title',
      'remoteid',
      'credit',
      'creator',
      'VisualId',
      'geom',
      [sequelize.fn('ST_Envelope', sequelize.col('geom')), 'box'],
      [sequelize.fn('ST_X', sequelize.col('point')), 'x'],
      [sequelize.fn('ST_Y', sequelize.col('point')), 'y']
    ],
    where: {
      firstyear: {
        [Op.lte]: params.firstyear
      },
      lastyear: {
        [Op.gte]: params.lastyear
      }
    },
    raw: true
  }).then((documents) => {
    const response = [];
    visuals.forEach((v) => {
      const visual = v;
      const docs = documents.filter(d => d.VisualId === visual.id);
      if (docs.length) {
        visual.documents = docs.map((d) => {
          const doc = d;
          doc.thumb = `https://s3.amazonaws.com/tilecache.axismaps.io/highways-waterways/thumbs/${doc.remoteid}.png`;
          if (!doc.x || !doc.y) {
            doc.extent = [doc.box.coordinates[0][0], doc.box.coordinates[0][2]];
            doc.tiles = `https://s3.amazonaws.com/tilecache.axismaps.io/highways-waterways/${doc.remoteid}/{z}/{x}/{y}.png`;
          } else {
            doc.point = [doc.x, doc.y];
            doc.viewcone = doc.geom;
            visual.viewcone = true;
          }
          return _.omit(doc, 'VisualId', 'remoteid', 'geom', 'box', 'x', 'y');
        });
        response.push(visual);
      }
    });
    res.status(httpStatus.OK);
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: 'OK',
      response
    });
  }));
};
