/* eslint-disable func-names */

module.exports = (sequelize, DataTypes) => {
  const TileRange = sequelize.define('TileRange', {
    firstyear: DataTypes.INTEGER,
    lastyear: DataTypes.INTEGER
  }, {});

  TileRange.getFirstYear = function () {
    return sequelize.query(`SELECT firstyear FROM lines
      UNION SELECT firstyear FROM polygons
      UNION SELECT firstyear FROM points
      ORDER BY firstyear
      LIMIT 1`, { type: sequelize.QueryTypes.SELECT });
  };

  TileRange.calculate = function (start, totalFeatures, additionalFeatures) {
    return TileRange.destroy({
      where: {},
      truncate: true
    }).then(() => sequelize.query(`SELECT getTileRange(${start}, ${totalFeatures}, ${additionalFeatures}) AS end`, { type: sequelize.QueryTypes.SELECT })
      .then(end => this.create({ firstyear: start, lastyear: end[0].end })
        .then(() => parseInt(end[0].end, 10))));
  };

  return TileRange;
};
