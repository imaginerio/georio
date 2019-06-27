const { Layer } = require('@models');

/* eslint-disable arrow-body-style */
const service = require('./new-layer.service');

describe('Service - newLayer', () => {
  beforeEach(() => {});

  afterAll(() => Layer.destroy({
    where: {
      name: 'testLayer',
      geometry: 'polygon'
    }
  }));

  it('should do unit test for ', () => {
    return service('testLayer', 'polygon').then(() => service('testLayer', 'polygon'));
  });
});
