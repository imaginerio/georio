const { pick, without } = require('underscore');
const {
  Changeset, Point, Line, Polygon, Sequelize
} = require('@models/');

/**
 * GetChangeset Service
 *
 */
const getChangesetService = (id) => {
  const where = {};
  if (id) where.id = id;
  const attributes = ['id', 'name', 'firstyear', 'lastyear', 'tags', 'toDelete', 'geom', 'createdAt', 'updatedAt'];

  return Changeset.findAll({
    where,
    attributes: ['id', 'title', 'createdAt'],
    include: [{
      model: Point,
      attributes,
      where: {
        [Sequelize.Op.or]: [
          { approved: false },
          { toDelete: true }
        ]
      },
      include: [
        {
          model: Point,
          as: 'originalFeature',
          attributes,
          include: {
            association: 'Type',
            attributes: ['id', 'title']
          }
        }, {
          association: 'Type',
          attributes: ['id', 'title'],
          include: {
            association: 'Layer',
            attributes: ['id', 'title']
          }
        }, {
          association: 'User',
          as: 'edited',
          attributes: ['name', 'email']
        }
      ],
      required: false
    }, {
      model: Line,
      attributes,
      where: {
        [Sequelize.Op.or]: [
          { approved: false },
          { toDelete: true }
        ]
      },
      include: [
        {
          model: Line,
          as: 'originalFeature',
          attributes,
          include: {
            association: 'Type',
            attributes: ['id', 'title']
          }
        }, {
          association: 'Type',
          attributes: ['id', 'title'],
          include: {
            association: 'Layer',
            attributes: ['id', 'title']
          }
        }, {
          association: 'User',
          as: 'edited',
          attributes: ['name', 'email']
        }
      ],
      required: false
    }, {
      model: Polygon,
      attributes,
      where: {
        [Sequelize.Op.or]: [
          { approved: false },
          { toDelete: true }
        ]
      },
      include: [
        {
          model: Polygon,
          as: 'originalFeature',
          attributes,
          include: {
            association: 'Type',
            attributes: ['id', 'title']
          }
        }, {
          association: 'Type',
          attributes: ['id', 'title'],
          include: {
            association: 'Layer',
            attributes: ['id', 'title']
          }
        }, {
          association: 'User',
          as: 'edited',
          attributes: ['name', 'email']
        }
      ],
      required: false
    }]
  }).then(changesets => changesets.map(cs => ({
    id: cs.id,
    title: cs.title,
    createdAt: cs.createdAt,
    changes: [...cs.Points, ...cs.Lines, ...cs.Polygons].map((feature) => {
      const change = {
        newFeature: {
          id: feature.id,
          type: 'Feature',
          properties: {
            ...pick(feature, without(attributes, 'geom')),
            type: feature.Type.id,
            layerName: feature.Type.Layer.title,
            layerId: feature.Type.Layer.id
          },
          geometry: feature.geom
        },
        user: feature.User
      };
      if (feature.dataValues.originalFeature) {
        change.originalFeature = {
          id: feature.dataValues.originalFeature.id,
          type: 'Feature',
          properties: {
            ...pick(feature.dataValues.originalFeature, without(attributes, 'geom')),
            type: feature.dataValues.originalFeature.Type.id,
            layerName: feature.Type.Layer.title,
            layerId: feature.Type.Layer.id
          },
          geometry: feature.dataValues.originalFeature.geom
        };
      }
      return change;
    })
  })));
};

module.exports = getChangesetService;
