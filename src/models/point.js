module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('Point', {
    remoteId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    geom: DataTypes.GEOMETRY('MULTIPOINT', 4326)
  }, {});

  Point.associate = (models) => {
    Point.belongsTo(models.Type);
  };

  return Point;
};
