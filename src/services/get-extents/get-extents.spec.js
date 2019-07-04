/* eslint-disable arrow-body-style */
const service = require('./get-extents.service');
const newLayerService = require('../new-layer');
const { Layer } = require('@models/');

describe('Service - getExtents', () => {
  beforeEach(() => {
    return newLayerService('testExtentLayer', 'polygon');
  });

  afterEach(() => {});

  it('TODO: should do unit test for ', () => Layer.getLayer('testExtentLayer')
    .then(layer => service({
      firstyear: 1980,
      lastyear: 1980
    }, layer)));
});
