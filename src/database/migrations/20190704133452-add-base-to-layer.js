module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Layers', 'base', { type: Sequelize.BOOLEAN }),

  down: queryInterface => queryInterface.removeColumn('Layers', 'base')
};
