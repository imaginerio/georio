const { sequelize } = require('@models');

/**
 * MakeTile Service
 *
 */
const makeTileService = (params, layer, fields) => sequelize.query(
  `SELECT
    ST_AsMVT(q, '${layer}', 4096, 'geom')::BYTEA AS mvt
  FROM (
    SELECT
      ${fields.join(', ')},
      ST_AsMVTGeom(geom_merc, TileBBox(${params.z}, ${params.x}, ${params.y}, 3857), 4096, 64, true) AS geom
    FROM "${layer}"
    WHERE geom_merc && TileBBox(${params.z}, ${params.x}, ${params.y}, 3857)
  ) AS q WHERE geom IS NOT NULL`,
  { type: sequelize.QueryTypes.SELECT }
);

module.exports = makeTileService;
