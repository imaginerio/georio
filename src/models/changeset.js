module.exports = (sequelize, DataTypes) => {
  const Changeset = sequelize.define('Changeset', {
    title: DataTypes.TEXT
  }, {});

  Changeset.associate = (models) => {
    Changeset.hasMany(models.Point);
    Changeset.hasMany(models.Line);
    Changeset.hasMany(models.Polygon);
    Changeset.belongsTo(models.User);
  };

  return Changeset;
};
