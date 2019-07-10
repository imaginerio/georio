module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TileRanges', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstyear: {
      type: Sequelize.INTEGER
    },
    lastyear: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('TileRanges')
};
