const Sequelize = require('sequelize');
const { promisify } = require('util');
const dbgeo = require('dbgeo');

const dbgeoAsync = promisify(dbgeo.parse);
const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  const Layer = sequelize.define('Layer', {
    name: DataTypes.TEXT,
    geometry: DataTypes.STRING,
    minzoom: DataTypes.INTEGER,
    base: DataTypes.BOOLEAN
  }, {});

  Layer.associate = (models) => {
    Layer.belongsTo(models.Dataset);
    Layer.hasMany(models.Type);
  };

  Layer.getBaseLayers = () => Layer.findAll({
    attributes: ['id', 'name', 'geometry', 'minzoom'],
    where: { base: true }
  });

  Layer.prototype.getGeo = function (params, attributes) { // eslint-disable-line func-names
    const {
      Point, Line, Polygon, Type
    } = sequelize.models;
    const geoms = {
      point: Point,
      line: Line,
      polygon: Polygon
    };
    const { firstyear, lastyear } = params;
    const { id, geometry } = this;
    const model = geoms[geometry];
    return model.findAll({
      attributes,
      where: {
        firstyear: {
          [Op.lte]: firstyear
        },
        lastyear: {
          [Op.gte]: lastyear
        }
      },
      include: [{
        model: Type,
        attributes: [],
        required: true,
        include: [{
          model: Layer,
          attributes: [],
          where: { id }
        }]
      }],
      raw: true
    });
  };

  Layer.prototype.getExtent = function (params) { // eslint-disable-line func-names
    return this.getGeo(params, [[Sequelize.fn('ST_Extent', Sequelize.col('geom')), 'extents']])
      .then((ex) => {
        if (ex[0].extents) return ex[0].extents.match(/-?\d+\.?\d*/gm).map(e => parseFloat(e));
        return [];
      });
  };

  Layer.prototype.getGeoJSON = function (params) { // eslint-disable-line func-names
    return this.getGeo(params, [
      'id',
      'name',
      [Sequelize.fn('ST_AsGeoJSON', Sequelize.col('geom')), 'geom']
    ]).then(layer => dbgeoAsync(layer, {
      outputFormat: 'geojson',
      geometryColumn: 'geom',
      geometryType: 'geojson',
      precision: 6,
      quantization: 2
    }));
  };

  Layer.getLayer = name => Layer.findOne({
    where: { name }
  });

  return Layer;
};
