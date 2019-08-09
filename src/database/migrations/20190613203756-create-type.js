module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Types', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    title: {
      type: Sequelize.TEXT
    },
    remoteId: {
      type: Sequelize.TEXT
    },
    LayerId: {
      type: Sequelize.UUID,
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
