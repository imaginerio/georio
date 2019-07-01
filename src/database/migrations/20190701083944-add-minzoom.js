module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Layers', 'minzoom', { type: Sequelize.INTEGER })
    .then(() => queryInterface.addColumn('Types', 'minzoom', { type: Sequelize.INTEGER })),

  down: queryInterface => queryInterface.removeColumn('Layers', 'minzoom')
    .then(() => queryInterface.removeColumn('Types', 'minzoom'))
};
