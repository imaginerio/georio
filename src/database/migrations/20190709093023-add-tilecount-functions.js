require('module-alias/register');
const { sequelize } = require('@models/');

module.exports = {
  up: () => sequelize.query(`CREATE OR REPLACE FUNCTION getFeatureCount (startyear INTEGER, endyear INTEGER)
    RETURNS NUMERIC AS
    'SELECT SUM(count) FROM (
      SELECT COUNT(*) FROM points f
        INNER JOIN "Types" t ON f."TypeId" = t.id
        INNER JOIN "Layers" l ON t."LayerId" = l.id
        WHERE l.base = TRUE
          AND (
            (startyear >= f.firstyear AND startyear <= f.lastyear)
            OR (endyear >= f.firstyear AND endyear <= f.lastyear)
          )
      UNION SELECT COUNT(*) FROM lines f
        INNER JOIN "Types" t ON f."TypeId" = t.id
        INNER JOIN "Layers" l ON t."LayerId" = l.id
        WHERE l.base = TRUE
          AND (
            (startyear >= f.firstyear AND startyear <= f.lastyear)
            OR (endyear >= f.firstyear AND endyear <= f.lastyear)
          )
      UNION SELECT COUNT(*) FROM polygons f
        INNER JOIN "Types" t ON f."TypeId" = t.id
        INNER JOIN "Layers" l ON t."LayerId" = l.id
        WHERE l.base = TRUE
          AND (
            (startyear >= f.firstyear AND startyear <= f.lastyear)
            OR (endyear >= f.firstyear AND endyear <= f.lastyear)
          )
    ) q;'
    LANGUAGE SQL
    IMMUTABLE;
    
  CREATE OR REPLACE FUNCTION getTileRange (firstyear INTEGER, totalFeatures INTEGER, additionalFeatures INTEGER)
    RETURNS NUMERIC AS
    $$
    DECLARE
      featureCount NUMERIC;
      initialCount NUMERIC;
      lastyear INTEGER;
      i INTEGER;
    BEGIN
      lastyear := firstyear;
      i := 1;
      SELECT getFeatureCount(firstyear, lastyear) INTO initialCount;
      LOOP
        EXIT WHEN lastyear >= 2019;
        lastyear := lastyear + i;
        i := i + 1;
        SELECT getFeatureCount(firstyear, lastyear) INTO featureCount;
        EXIT WHEN featureCount >= totalFeatures AND featureCount - initialCount >= additionalFeatures;
      END LOOP;
      RETURN lastyear;
    END;
    $$
    LANGUAGE plpgsql;`),

  down: () => sequelize.query('DROP FUNCTION IF EXISTS getFeatureCount; DROP FUNCTION IF EXISTS getTileRange;')
};
