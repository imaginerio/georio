/* eslint-disable func-names */
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.TEXT,
    email: {
      type: DataTypes.TEXT,
      unique: true
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});

  User.beforeSave((u) => {
    const user = u;
    if (user.changed('password')) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    }
    return user;
  });

  User.prototype.comparePassword = function (password) {
    return Promise.resolve()
      .then(() => bcrypt.compareSync(password, this.password))
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  User.prototype.getEdits = async function (layerId) {
    const layer = await sequelize.models.Layer.findByPk(layerId);
    const model = layer.getGeomModel();
    return model;
  };

  User.associate = (models) => {
    User.hasMany(models.Polygon, {
      foreignKey: 'editedBy'
    });
    User.hasMany(models.Line, {
      foreignKey: 'editedBy'
    });
    User.hasMany(models.Point, {
      foreignKey: 'editedBy'
    });
  };
  return User;
};
