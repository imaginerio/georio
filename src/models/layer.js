const Sequelize = require('sequelize');
const { promisify } = require('util');
const dbgeo = require('dbgeo');
const uuid = require('uuid');

const dbgeoAsync = promisify(dbgeo.parse);
const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  const Layer = sequelize.define('Layer', {
    title: DataTypes.TEXT,
    remoteId: DataTypes.STRING,
    geometry: DataTypes.STRING,
    minzoom: DataTypes.INTEGER,
    base: DataTypes.BOOLEAN
  }, {});

  Layer.associate = (models) => {
    Layer.belongsTo(models.Dataset);
    Layer.hasMany(models.Type);
  };

  Layer.getBaseLayers = () => Layer.findAll({
    attributes: ['id', 'title', 'geometry', 'minzoom'],
    where: { base: true }
  });

  Layer.getGeomModel = (geom) => {
    const {
      Point, Line, Polygon
    } = sequelize.models;
    const geoms = {
      point: Point,
      line: Line,
      polygon: Polygon
    };
    return geoms[geom];
  };

  Layer.prototype.getGeo = function (params = {}, attributes = ['id', 'name', 'firstyear', 'lastyear', 'geom', ['TypeId', 'type']]) { // eslint-disable-line func-names
    const { Type } = sequelize.models;
    const { firstyear, lastyear } = params;
    const where = {};
    if (firstyear) where.firstyear = { [Op.lte]: firstyear };
    if (lastyear) where.lastyear = { [Op.gte]: lastyear };

    const { id, geometry } = this;
    const model = Layer.getGeomModel(geometry);
    return model.findAllWithStream({
      attributes,
      where,
      include: [{
        model: Type,
        attributes: [],
        required: true,
        include: [{
          model: Layer,
          attributes: [],
          where: { id }
        }]
      }]
    });
  };

  Layer.getUpdated = (date) => {
    const { Type } = sequelize.models;

    return Layer.findAll({ attributes: ['id', 'geometry'] })
      .then((layers) => {
        const records = layers.map((l) => {
          const model = Layer.getGeomModel(l.geometry);
          return model.findAll({
            where: {
              updatedAt: {
                [Op.lt]: date
              }
            },
            attributes: ['id'],
            limit: 1,
            include: [{
              model: Type,
              required: true,
              include: [{
                model: Layer,
                attributes: ['id', 'geometry'],
                where: { id: l.id }
              }]
            }]
          });
        });
        return Promise.all(records)
          .then(updated => updated.map(u => (u[0] ? u[0].Type.Layer : null)).filter(u => u));
      });
  };

  Layer.prototype.getExtent = function () { // eslint-disable-line func-names
    const { geometry, id } = this;
    const { Type } = sequelize.models;
    const model = Layer.getGeomModel(geometry);
    return model.findAll({
      attributes: [[Sequelize.fn('ST_Extent', Sequelize.col('geom')), 'extents']],
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
    }).then((ex) => {
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

  Layer.newLayer = (data) => {
    const props = data;
    props.id = uuid.v4();
    return Layer.create(props).then(layer => layer.id);
  };

  return Layer;
};
