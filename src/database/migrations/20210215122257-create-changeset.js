

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Changesets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
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
  }).then(() => queryInterface.addColumn('polygons', 'ChangesetId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Changesets',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }))
    .then(() => queryInterface.addColumn('lines', 'ChangesetId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Changesets',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }))
    .then(() => queryInterface.addColumn('points', 'ChangesetId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Changesets',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })),
  down: async queryInterface => queryInterface.removeColumn('points', 'ChangesetId')
    .then(() => queryInterface.removeColumn('polygons', 'ChangesetId'))
    .then(() => queryInterface.removeColumn('lines', 'ChangesetId'))
    .then(() => queryInterface.dropTable('Changesets'))
};
