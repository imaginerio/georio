/* eslint-disable no-await-in-loop */

const { TileRange } = require('@models');

/**
 * MakeTilerange Service
 *
 */

const makeTilerangeService = (totalFeatures = 20000, additionalFeatures = 10000) => TileRange.getFirstYear()
  .then(async (start) => {
    let { firstyear } = start[0];
    while (firstyear <= new Date().getFullYear()) {
      firstyear = await TileRange.calculate(firstyear, totalFeatures, additionalFeatures);
      firstyear += 1;
    }
  }).catch((e) => {
    console.log(e);
  });

module.exports = makeTilerangeService;