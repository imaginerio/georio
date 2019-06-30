module.exports = (sequelize, DataTypes) => {
  const Line = sequelize.define('Line', {
    remoteId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    geom: DataTypes.GEOMETRY('MULTILINESTRING', 4326),
    geom_merc: DataTypes.GEOMETRY('MULTILINESTRING', 3857)
  }, {
    tableName: 'lines'
  });

  Line.associate = (models) => {
    Line.belongsTo(models.Type);
  };

  return Line;
};
