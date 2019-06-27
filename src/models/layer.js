module.exports = (sequelize, DataTypes) => {
  const Layer = sequelize.define('Layer', {
    name: DataTypes.TEXT,
    geometry: DataTypes.STRING
  }, {});

  Layer.associate = (models) => {
    Layer.belongsTo(models.Dataset);
    Layer.hasMany(models.Type);
  };

  Layer.getLayers = () => Layer.findAll({
    attributes: ['id', 'name', 'geometry']
  });

  return Layer;
};
