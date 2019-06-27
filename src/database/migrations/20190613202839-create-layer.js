module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Layers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
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
