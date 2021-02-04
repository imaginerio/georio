module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.dropTable('Changes', { cascade: true })
    .then(() => queryInterface.addColumn('polygons', 'editedBy', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    .then(() => queryInterface.addColumn('lines', 'editedBy', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    .then(() => queryInterface.addColumn('points', 'editedBy', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    .then(() => queryInterface.addColumn('polygons', 'original', {
      type: Sequelize.STRING,
      references: {
        model: 'polygons',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    .then(() => queryInterface.addColumn('lines', 'original', {
      type: Sequelize.STRING,
      references: {
        model: 'lines',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    .then(() => queryInterface.addColumn('points', 'original', {
      type: Sequelize.STRING,
      references: {
        model: 'lines',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    .then(() => queryInterface.addColumn('polygons', 'toDelete', {
      type: Sequelize.BOOLEAN
    }))
    .then(() => queryInterface.addColumn('lines', 'toDelete', {
      type: Sequelize.BOOLEAN
    }))
    .then(() => queryInterface.addColumn('points', 'toDelete', {
      type: Sequelize.BOOLEAN
    })),
  down: async queryInterface => queryInterface.removeColumn('polygons', 'editedBy')
    .then(() => queryInterface.removeColumn('lines', 'editedBy'))
    .then(() => queryInterface.removeColumn('points', 'editedBy'))
    .then(() => queryInterface.removeColumn('polygons', 'original'))
    .then(() => queryInterface.removeColumn('lines', 'original'))
    .then(() => queryInterface.removeColumn('points', 'original'))
    .then(() => queryInterface.removeColumn('polygons', 'toDelete'))
    .then(() => queryInterface.removeColumn('lines', 'toDelete'))
    .then(() => queryInterface.removeColumn('points', 'toDelete'))
};
