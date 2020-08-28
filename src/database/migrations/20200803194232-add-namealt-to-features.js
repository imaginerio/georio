module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('points', 'namealt', { type: Sequelize.STRING })
    .then(() => queryInterface.addColumn('lines', 'namealt', { type: Sequelize.STRING }))
    .then(() => queryInterface.addColumn('polygons', 'namealt', { type: Sequelize.STRING })),
  down: queryInterface => queryInterface.removeColumn('points', 'namealt')
    .then(() => queryInterface.removeColumn('lines', 'namealt'))
    .then(() => queryInterface.removeColumn('polygons', 'namealt'))
};
