const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  const Tile = sequelize.define('Tile', {
    z: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    mvt: DataTypes.BLOB
  }, {});

  Tile.associate = (models) => {
    Tile.belongsTo(models.Layer);
  };

  Tile.makeTile = (params, layer) => sequelize.query(
    `SELECT
      ST_AsMVT(q, '${layer.id}', 4096, 'geom')::BYTEA AS mvt
    FROM (
      SELECT
        f.id,
        f.firstyear,
        f.lastyear,
        f.name,
        f.namealt,
        t.id AS type,
        ST_AsMVTGeom(geom_merc, TileBBox(${params.z}, ${params.x}, ${params.y}, 3857), 4096, 64, true) AS geom
      FROM ${layer.geometry}s AS f
      INNER JOIN "Types" AS t ON "TypeId" = t.id
      INNER JOIN "Layers" AS l ON "LayerId" = l.id
      WHERE l.id = '${layer.id}'
        AND COALESCE(t.minzoom, l.minzoom, 14) <= ${params.z}
        AND firstyear <= ${params.lastyear}
        AND lastyear >= ${params.firstyear}
        AND geom_merc && TileBBox(${params.z}, ${params.x}, ${params.y}, 3857)
    ) AS q WHERE geom IS NOT NULL`,
    { type: sequelize.QueryTypes.SELECT }
  ).then((tile) => {
    const p = params;
    p.mvt = tile[0].mvt;
    p.LayerId = layer.id;
    return Tile.upsert(p);
  });

  Tile.getTile = (params, layer) => {
    const {
      z,
      x,
      y,
      firstyear,
      lastyear
    } = params;

    return Tile.findOne({
      where: {
        z,
        x,
        y,
        firstyear: {
          [Op.lte]: lastyear
        },
        lastyear: {
          [Op.gte]: firstyear
        },
        LayerId: layer.id
      },
      attributes: ['mvt']
    }).then((tile) => {
      if (tile) return tile;
      console.log('TILE DOES NOT EXIST');
      return Tile.makeTile(params, layer)
        .then(() => Tile.getTile(params, layer));
    });
  };

  Tile.getLatest = () => Tile.findAll({
    limit: 1,
    order: [['updatedAt', 'DESC']],
    attributes: ['updatedAt']
  }).then(latest => (latest[0] ? latest[0].updatedAt : null));

  return Tile;
};
