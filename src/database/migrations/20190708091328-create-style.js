module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Styles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    order: {
      type: Sequelize.INTEGER
    },
    TypeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Types',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    style: {
      type: Sequelize.JSON
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
  down: queryInterface => queryInterface.dropTable('Styles')
};
