module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    expires: {
      type: Sequelize.DATE
    },
    data: {
      type: Sequelize.STRING(50000)
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
  down: queryInterface => queryInterface.dropTable('Session')
};
