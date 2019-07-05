module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('polygons', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING(8)
    },
    remoteId: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.TEXT
    },
    firstyear: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    lastyear: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    firstdate: {
      type: Sequelize.DATE
    },
    lastdate: {
      type: Sequelize.DATE
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
    geom: {
      allowNull: false,
      type: Sequelize.GEOMETRY('MULTIPOLYGON', 4326)
    },
    geom_merc: {
      allowNull: false,
      type: Sequelize.GEOMETRY('MULTIPOLYGON', 3857)
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
  down: queryInterface => queryInterface.dropTable('polygons')
};
