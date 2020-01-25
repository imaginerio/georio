module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Layers', 'slider', { type: Sequelize.STRING })
    .then(() => queryInterface.addColumn('Types', 'order', { type: Sequelize.INTEGER })),

  down: queryInterface => queryInterface.removeColumn('Layers', 'slider')
    .then(() => queryInterface.removeColumn('Types', 'order'))
};
