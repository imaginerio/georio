module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Documents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstyear: {
      type: Sequelize.INTEGER
    },
    lastyear: {
      type: Sequelize.INTEGER
    },
    remoteid: {
      type: Sequelize.STRING
    },
    VisualId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Visuals',
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
  down: queryInterface => queryInterface.dropTable('Documents')
};
