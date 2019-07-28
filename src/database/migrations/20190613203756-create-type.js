module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Types', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.TEXT
    },
    title: {
      type: Sequelize.TEXT
    },
    LayerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Layers',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
  down: queryInterface => queryInterface.dropTable('Types')
};
