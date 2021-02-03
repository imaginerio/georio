require('module-alias/register');
const { User } = require('@models/');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => User.create({
      name: 'Admin',
      email: 'admin@leventcarta.org',
      password: 'admin',
      isAdmin: true
    })).then(() => User.create({
      name: 'User',
      email: 'user@levantcarta.org',
      password: 'user'
    })).then(() => queryInterface.addColumn('Changes', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }));
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  }
};
