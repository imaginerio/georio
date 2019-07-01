module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Caches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    z: {
      type: Sequelize.INTEGER
    },
    x: {
      type: Sequelize.INTEGER
    },
    y: {
      type: Sequelize.INTEGER
    },
    startYear: {
      type: Sequelize.INTEGER
    },
    endYear: {
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
  down: queryInterface => queryInterface.dropTable('Caches')
};
