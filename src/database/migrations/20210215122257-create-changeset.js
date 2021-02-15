

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
  }).then(() => queryInterface.addColumn('polygons', 'changesetId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Changesets',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }))
    .then(() => queryInterface.addColumn('lines', 'changesetId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Changesets',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }))
    .then(() => queryInterface.addColumn('points', 'changesetId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Changesets',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })),
  down: async queryInterface => queryInterface.dropTable('Changesets')
    .then(() => queryInterface.removeColumn('polygons', 'changesetId'))
    .then(() => queryInterface.removeColumn('lines', 'changesetId'))
    .then(() => queryInterface.removeColumn('points', 'changesetId'))
};
