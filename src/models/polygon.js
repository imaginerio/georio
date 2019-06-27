module.exports = (sequelize, DataTypes) => {
  const Polygon = sequelize.define('Polygon', {
    remoteId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    geom: DataTypes.GEOMETRY('MULTIPOLYGON', 4326),
    geom_merc: DataTypes.GEOMETRY('MULTIPOLYGON', 3857)
  }, {});

  Polygon.associate = (models) => {
    Polygon.belongsTo(models.Type);
  };

  return Polygon;
};
