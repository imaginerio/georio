module.exports = (sequelize, DataTypes) => {
  const Layer = sequelize.define('Layer', {
    name: DataTypes.TEXT,
    geometry: DataTypes.STRING,
    minzoom: DataTypes.INTEGER
  }, {});

  Layer.associate = (models) => {
    Layer.belongsTo(models.Dataset);
    Layer.hasMany(models.Type);
  };

  Layer.getLayers = () => Layer.findAll({
    attributes: ['id', 'name', 'geometry', 'minzoom']
  });

  Layer.getLayer = name => Layer.findOne({
    where: { name }
  });

  return Layer;
};
