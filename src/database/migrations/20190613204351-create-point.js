module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('points', {
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
      type: Sequelize.DATEONLY
    },
    lastdate: {
      type: Sequelize.DATEONLY
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
      type: Sequelize.GEOMETRY('MULTIPOINT', 4326)
    },
    geom_merc: {
      allowNull: false,
      type: Sequelize.GEOMETRY('MULTIPOINT', 3857)
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
  down: queryInterface => queryInterface.dropTable('points')
};
