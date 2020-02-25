/* eslint-disable arrow-body-style */
const path = require('path');
const service = require('./import-visual.service');
const { Visual } = require('@models');

describe('Service - importVisual', () => {
  let visual;
  beforeEach(async () => {
    visual = await Visual.create({ title: 'test' });
  });

  afterEach(() => {});

  it('TODO: should do unit test for ', () => {
    console.log(path.join(__dirname, '../../test/shp/viewconespoly.shp'));
    service(path.join(__dirname, '../../test/shp/viewconespoly.shp'), visual);
  });
});
