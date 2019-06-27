require('module-alias/register');
const { sequelize } = require('@models/');

module.exports = {
  up: () => sequelize.query(`create or replace function TileBBox (z int, x int, y int, srid int = 3857)
      returns geometry
      language plpgsql immutable as
    $func$
    declare
      max numeric := 20037508.34;
      res numeric := (max*2)/(2^z);
      bbox geometry;
    begin
      bbox := ST_MakeEnvelope(
          -max + (x * res),
          max - (y * res),
          -max + (x * res) + res,
          max - (y * res) - res,
          3857
      );
      if srid = 3857 then
          return bbox;
      else
          return ST_Transform(bbox, srid);
      end if;
    end;
    $func$;`),

  down: () => sequelize.query('DROP FUNCTION IF EXISTS TileBBox')
};
