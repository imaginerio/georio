const nanoid = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  const Polygon = sequelize.define('Polygon', {
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
    geom: DataTypes.GEOMETRY('MULTIPOLYGON', 4326),
    geom_merc: DataTypes.GEOMETRY('MULTIPOLYGON', 3857)
  }, {
    tableName: 'polygons'
  });

  Polygon.associate = (models) => {
    Polygon.belongsTo(models.Type);
    Polygon.belongsTo(models.User, {
      foreignKey: 'edited'
    });
    Polygon.belongsTo(models.Polygon, {
      foreignKey: 'original',
      as: 'originalFeature'
    });
    Polygon.hasOne(models.Polygon, {
      foreignKey: 'original',
      as: 'editedFeature'
    });
  };

  return Polygon;
};
