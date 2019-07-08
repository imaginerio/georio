module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.TEXT,
    minzoom: DataTypes.INTEGER
  }, {});

  Type.associate = (models) => {
    Type.belongsTo(models.Layer);
    Type.hasMany(models.Point);
    Type.hasMany(models.Line);
    Type.hasMany(models.Polygon);
    Type.hasMany(models.Style);
  };

  Type.getType = name => Type.findOne({
    where: { name }
  });

  return Type;
};
