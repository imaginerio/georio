const nanoid = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('Point', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(8),
      defaultValue: () => nanoid(8)
    },
    remoteId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    namealt: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    tags: DataTypes.JSON,
    approved: DataTypes.BOOLEAN,
    toDelete: DataTypes.BOOLEAN,
    geom: DataTypes.GEOMETRY('MULTIPOINT', 4326),
    geom_merc: DataTypes.GEOMETRY('MULTIPOINT', 3857)
  }, {
    tableName: 'points'
  });

  Point.associate = (models) => {
    Point.belongsTo(models.Type);
    Point.belongsTo(models.Changeset);
    Point.belongsTo(models.User, {
      foreignKey: 'edited'
    });
    Point.belongsTo(models.Point, {
      foreignKey: 'original',
      as: 'originalFeature'
    });
  };

  return Point;
};
