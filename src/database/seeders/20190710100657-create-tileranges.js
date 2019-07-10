require('module-alias/register');
const makeTileRange = require('@services/make-tilerange');

module.exports = {
  up: () => makeTileRange(50000, 25000),

  down: queryInterface => queryInterface.bulkDelete('Styles')
};
