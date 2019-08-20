module.exports = (sequelize, DataTypes) => {
  const Cache = sequelize.define('Cache', {
    z: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    layer: DataTypes.STRING
  }, {});

  Cache.check = where => Cache.findOne({ where }).then((c) => {
    if (c) return true;
    return false;
  });

  return Cache;
};
