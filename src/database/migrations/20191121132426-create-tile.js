module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    z: {
      type: Sequelize.INTEGER
    },
    x: {
      type: Sequelize.INTEGER
    },
    y: {
      type: Sequelize.INTEGER
    },
    firstyear: {
      type: Sequelize.INTEGER
    },
    lastyear: {
      type: Sequelize.INTEGER
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
    mvt: {
      type: Sequelize.BLOB
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }).then(() => queryInterface.addIndex('Tiles', {
    unique: true,
    fields: ['z', 'x', 'y', 'firstyear', 'lastyear', 'LayerId']
  })),
  down: queryInterface => queryInterface.dropTable('Tiles')
};
