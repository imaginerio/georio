module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('polygons', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    remoteId: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.TEXT
    },
    firstyear: {
      type: Sequelize.INTEGER
    },
    lastyear: {
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
      type: Sequelize.GEOMETRY('MULTIPOLYGON', 4326)
    },
    geom_merc: {
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
