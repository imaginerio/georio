module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER,
    remoteid: DataTypes.STRING,
    geom: DataTypes.GEOMETRY('MULTIPOLYGON', 4326),
    geom_merc: DataTypes.GEOMETRY('MULTIPOLYGON', 3857)
  }, {});
  Document.associate = (models) => {
    Document.belongsTo(models.Visual);
  };
  return Document;
};
