const { Layer, Type, Sequelize } = require('@models');

const { Op } = Sequelize;

/* eslint-disable arrow-body-style */
const service = require('./new-type.service');

describe('Service - newType', () => {
  beforeEach(() => Layer.create({ name: 'testLayer', geometry: 'polygon' })
    .then(layer => Type.create({ name: 'testTypeBefore' })
      .then(type => type.setLayer(layer))));

  afterEach(() => Layer.destroy({
    where: {
      name: 'testLayer',
      geometry: 'polygon'
    }
  }).then(() => {
    return Type.destroy({
      where: {
        name: {
          [Op.iLike]: `test%`
        }
      }
    });
  }));

  it('should do unit test for ', () => Layer.findOne({
    where: {
      name: 'testLayer'
    }
  }).then(layer => service(layer, 'testType')
    .then(() => service(layer, 'testTypeBefore'))));
});
