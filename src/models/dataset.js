module.exports = (sequelize, DataTypes) => {
  const Dataset = sequelize.define('Dataset', {
    name: DataTypes.TEXT
  }, {});

  return Dataset;
};
