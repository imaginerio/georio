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
            attributes: ['title']
          }
        }, {
          association: 'Type',
          attributes: ['title'],
          include: {
            association: 'Layer',
            attributes: ['title']
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
            attributes: ['title']
          }
        }, {
          association: 'Type',
          attributes: ['title'],
          include: {
            association: 'Layer',
            attributes: ['title']
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
            attributes: ['title']
          }
        }, {
          association: 'Type',
          attributes: ['title'],
          include: {
            association: 'Layer',
            attributes: ['title']
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
    changes: [...cs.Points, ...cs.Lines, ...cs.Polygons]
  })));
};

module.exports = getChangesetService;
