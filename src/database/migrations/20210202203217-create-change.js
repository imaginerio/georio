module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Changes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      approved: {
        type: Sequelize.BOOLEAN
      },
      editType: {
        type: Sequelize.STRING
      },
      originalPointId: {
        type: Sequelize.STRING,
        references: {
          model: 'points',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      originalLineId: {
        type: Sequelize.STRING,
        references: {
          model: 'lines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      originalPolygonId: {
        type: Sequelize.STRING,
        references: {
          model: 'polygons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      newPointId: {
        type: Sequelize.STRING,
        references: {
          model: 'points',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      newLineId: {
        type: Sequelize.STRING,
        references: {
          model: 'lines',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      newPolygonId: {
        type: Sequelize.STRING,
        references: {
          model: 'polygons',
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Changes');
  }
};
