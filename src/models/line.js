const nanoid = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  const Line = sequelize.define('Line', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(8),
      defaultValue: () => nanoid(8)
    },
    remoteId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    tags: DataTypes.JSON,
    approved: DataTypes.BOOLEAN,
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
