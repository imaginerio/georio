module.exports = (sequelize, DataTypes) => {
  const Polygon = sequelize.define('Polygon', {
    name: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    geom: DataTypes.GEOMETRY('MULTIPOLYGON', 4326)
  }, {});

  Polygon.associate = (models) => {
    Polygon.belongsTo(models.Type);
  };

  return Polygon;
};
