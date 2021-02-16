module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.dropTable('Changes', { cascade: true })
    .then(() => queryInterface.addColumn('polygons', 'edited', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
    .then(() => queryInterface.addColumn('lines', 'edited', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
    .then(() => queryInterface.addColumn('points', 'edited', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
    .then(() => queryInterface.addColumn('polygons', 'original', {
      type: Sequelize.STRING,
      references: {
        model: 'polygons',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
    .then(() => queryInterface.addColumn('lines', 'original', {
      type: Sequelize.STRING,
      references: {
        model: 'lines',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
    .then(() => queryInterface.addColumn('points', 'original', {
      type: Sequelize.STRING,
      references: {
        model: 'lines',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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
  down: async queryInterface => queryInterface.removeColumn('polygons', 'edited')
    .then(() => queryInterface.removeColumn('lines', 'edited'))
    .then(() => queryInterface.removeColumn('points', 'edited'))
    .then(() => queryInterface.removeColumn('polygons', 'original'))
    .then(() => queryInterface.removeColumn('lines', 'original'))
    .then(() => queryInterface.removeColumn('points', 'original'))
    .then(() => queryInterface.removeColumn('polygons', 'toDelete'))
    .then(() => queryInterface.removeColumn('lines', 'toDelete'))
    .then(() => queryInterface.removeColumn('points', 'toDelete'))
};
