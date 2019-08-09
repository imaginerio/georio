module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Layers', {
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
    geometry: {
      type: Sequelize.STRING,
      allowNull: false
    },
    DatasetId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Datasets',
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
  down: queryInterface => queryInterface.dropTable('Layers')
};
