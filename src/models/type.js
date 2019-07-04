module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.TEXT,
    style: DataTypes.JSON,
    minzoom: DataTypes.INTEGER
  }, {});

  Type.associate = (models) => {
    Type.belongsTo(models.Layer);
    Type.hasMany(models.Point);
    Type.hasMany(models.Line);
    Type.hasMany(models.Polygon);
  };

  Type.getType = name => Type.findOne({
    where: { name }
  });

  return Type;
};
