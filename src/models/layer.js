module.exports = (sequelize, DataTypes) => {
  const Layer = sequelize.define('Layer', {
    name: DataTypes.TEXT,
    geometry: DataTypes.STRING,
    minzoom: DataTypes.INTEGER,
    base: DataTypes.BOOLEAN
  }, {});

  Layer.associate = (models) => {
    Layer.belongsTo(models.Dataset);
    Layer.hasMany(models.Type);
  };

  Layer.getBaseLayers = () => Layer.findAll({
    attributes: ['id', 'name', 'geometry', 'minzoom'],
    where: { base: true }
  });

  Layer.getLayer = name => Layer.findOne({
    where: { name }
  });

  return Layer;
};
