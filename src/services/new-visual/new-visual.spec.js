/* eslint-disable arrow-body-style */
const service = require('./new-visual.service');
const { Visual } = require('@models');

describe('Service - newVisual', () => {
  let visual;
  beforeEach(async () => {
    visual = await Visual.create({ title: 'test' });
  });

  afterEach(() => {});

  it('TODO: should do unit test for ', () => {
    service({
      properties: {},
      geometry: {},
      visual
    });
  });
});
