module.exports = (sequelize, DataTypes) => {
  const Layer = sequelize.define('Layer', {
    name: DataTypes.TEXT
  }, {});
  Layer.associate = (models) => {
    Layer.belongsTo(models.Dataset);
  };
  return Layer;
};
