module.exports = (sequelize, DataTypes) => {
  const Style = sequelize.define('Style', {
    order: DataTypes.INTEGER,
    style: DataTypes.JSON
  }, {});
  Style.associate = (models) => {
    Style.belongsTo(models.Type);
  };

  return Style;
};
