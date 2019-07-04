const {
  Point, Line, Polygon, Layer, Type, Sequelize
} = require('@models');

const geoms = {
  point: Point,
  line: Line,
  polygon: Polygon
};

/**
 * GetExtents Service
 *
 */
const getExtentsService = (params, layer, type) => {
  const { firstyear, lastyear } = params;
  const model = geoms[layer.dataValues.geometry];
  const include = [{
    model: Type,
    attributes: [],
    include: [{
      model: Layer,
      attributes: [],
      where: {
        id: layer.id
      }
    }]
  }];
  if (type) include[0].where = { id: type.id };
  return model.findOne({
    attributes: [[Sequelize.fn('ST_Extent', Sequelize.col('geom')), 'extents']],
    where: { firstyear, lastyear },
    include,
    raw: true
  }).then((ex) => {
    if (ex.extents) return ex.extents.match(/-?\d+\.?\d*/gm).map(e => parseFloat(e));
    return [];
  });
};

module.exports = getExtentsService;
