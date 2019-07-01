const { sequelize } = require('@models');

/**
 * MakeTile Service
 *
 */
const makeTileService = (params, layer) => sequelize.query(
  `SELECT
    ST_AsMVT(q, '${layer.name + layer.geometry}', 4096, 'geom')::BYTEA AS mvt
  FROM (
    SELECT
      f.id,
      f.firstyear,
      f.lastyear,
      f.name,
      t.name AS type,
      ST_AsMVTGeom(geom_merc, TileBBox(${params.z}, ${params.x}, ${params.y}, 3857), 4096, 64, true) AS geom
    FROM ${layer.geometry}s AS f
    INNER JOIN "Types" AS t ON "TypeId" = t.id
    INNER JOIN "Layers" AS l ON "LayerId" = l.id
    WHERE l.name = '${layer.name}'
      AND firstyear <= ${params.startYear}
      AND lastyear >= ${params.endYear}
      AND geom_merc && TileBBox(${params.z}, ${params.x}, ${params.y}, 3857)
  ) AS q WHERE geom IS NOT NULL`,
  { type: sequelize.QueryTypes.SELECT }
);

module.exports = makeTileService;
