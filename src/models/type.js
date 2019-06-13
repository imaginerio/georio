module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.TEXT,
    style: DataTypes.JSON
  }, {});

  Type.associate = (models) => {
    Type.belongsTo(models.Layer);
  };

  return Type;
};
