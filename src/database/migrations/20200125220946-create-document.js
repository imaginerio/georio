module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Documents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.TEXT
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
    credit: {
      type: Sequelize.TEXT
    },
    creator: {
      type: Sequelize.TEXT
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
      type: Sequelize.GEOMETRY('POLYGON', 4326)
    },
    geom_merc: {
      allowNull: false,
      type: Sequelize.GEOMETRY('POLYGON', 3857)
    },
    point: {
      type: Sequelize.GEOMETRY('POINT', 4326)
    },
    point_merc: {
      type: Sequelize.GEOMETRY('POINT', 3857)
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
