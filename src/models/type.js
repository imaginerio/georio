const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    title: DataTypes.TEXT,
    remoteId: DataTypes.STRING,
    minzoom: DataTypes.INTEGER
  }, {});

  Type.associate = (models) => {
    Type.belongsTo(models.Layer);
    Type.hasMany(models.Point);
    Type.hasMany(models.Line);
    Type.hasMany(models.Polygon);
    Type.hasMany(models.Style);
  };

  Type.newType = (layer, data) => {
    const props = data;
    props.id = uuid.v4();
    props.LayerId = layer;
    return Type.create(props).then(type => type.id);
  };

  return Type;
};
