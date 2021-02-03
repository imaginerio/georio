module.exports = (sequelize, DataTypes) => {
  const Change = sequelize.define('Change', {
    approved: DataTypes.BOOLEAN,
    editType: DataTypes.STRING
  }, {});

  Change.getChanges = (id) => {
    let where = {};
    if (id) where = { id };
    return Change.findAll({ where });
  };

  Change.getFeatureType = async (id) => {
    const { Polygon, Line, Point } = sequelize.models;
    let feature = await Polygon.findByPk(id);
    if (feature) return { geom: 'Polygon', feature };

    feature = await Line.findByPk(id);
    if (feature) return { geom: 'Line', feature };

    feature = await Point.findByPk(id);
    if (feature) return { geom: 'Point', feature };

    return null;
  };

  Change.createChange = async ({ originalId, newId }) => {
    if (!originalId && !newId) return Promise.reject(new Error('One feature id is required'));
    const change = {};
    let originalFeature;
    let newFeature;
    if (originalId) {
      originalFeature = await Change.getFeatureType(originalId);
      if (originalFeature) {
        change[`original${originalFeature.geom}Id`] = originalId;
        change.editType = 'Delete';
      } else {
        return Promise.reject(new Error('Original feature not found'));
      }
    }
    if (newId) {
      newFeature = await Change.getFeatureType(newId);
      if (newFeature) {
        change[`new${newFeature.geom}Id`] = newId;
        if (originalFeature) {
          change.editType = 'Update';
        } else {
          change.editType = 'Create';
        }
      } else {
        return Promise.reject(new Error('New feature not found'));
      }
    }
    return Change.create(change);
  };

  Change.associate = (models) => {
    Change.belongsTo(models.User);
    Change.belongsTo(models.Point, {
      as: 'originalPoint'
    });
    Change.belongsTo(models.Line, {
      as: 'originalLine'
    });
    Change.belongsTo(models.Polygon, {
      as: 'originalPolygon'
    });
    Change.belongsTo(models.Point, {
      as: 'newPoint'
    });
    Change.belongsTo(models.Line, {
      as: 'newLine'
    });
    Change.belongsTo(models.Polygon, {
      as: 'newPolygon'
    });
  };

  return Change;
};
