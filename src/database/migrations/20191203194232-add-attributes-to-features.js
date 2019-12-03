module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('points', 'approved', { type: Sequelize.BOOLEAN })
    .then(() => queryInterface.addColumn('lines', 'approved', { type: Sequelize.BOOLEAN }))
    .then(() => queryInterface.addColumn('polygons', 'approved', { type: Sequelize.BOOLEAN }))
    .then(() => queryInterface.addColumn('points', 'tags', { type: Sequelize.JSON }))
    .then(() => queryInterface.addColumn('lines', 'tags', { type: Sequelize.JSON }))
    .then(() => queryInterface.addColumn('polygons', 'tags', { type: Sequelize.JSON })),

  down: queryInterface => queryInterface.removeColumn('points', 'approved')
    .then(() => queryInterface.removeColumn('lines', 'approved'))
    .then(() => queryInterface.removeColumn('polygons', 'approved'))
    .then(() => queryInterface.removeColumn('points', 'tags'))
    .then(() => queryInterface.removeColumn('lines', 'tags'))
    .then(() => queryInterface.removeColumn('polygons', 'tags'))
};
