module.exports = (sequelize, DataTypes) => {
  const Line = sequelize.define('Line', {
    name: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    geom: DataTypes.GEOMETRY('MULTILINESTRING', 4326)
  }, {});

  Line.associate = (models) => {
    Line.belongsTo(models.Type);
  };

  return Line;
};
