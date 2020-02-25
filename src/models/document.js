module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: DataTypes.TEXT,
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    remoteid: DataTypes.STRING,
    credit: DataTypes.TEXT,
    creator: DataTypes.TEXT,
    geom: DataTypes.GEOMETRY('POLYGON', 4326),
    geom_merc: DataTypes.GEOMETRY('POLYGON', 3857),
    point: DataTypes.GEOMETRY('POINT', 4326),
    point_merc: DataTypes.GEOMETRY('POINT', 3857)
  }, {});
  Document.associate = (models) => {
    Document.belongsTo(models.Visual);
  };
  return Document;
};
