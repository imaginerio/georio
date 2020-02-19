module.exports = (sequelize, DataTypes) => {
  const Visual = sequelize.define('Visual', {
    title: DataTypes.STRING
  }, {});
  Visual.associate = (models) => {
    Visual.hasMany(models.Document);
  };
  return Visual;
};
