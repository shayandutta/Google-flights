'use strict';

const { query } = require('winston');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports', {
      type: 'FOREIGN KEY',
      name: 'city_airport_association',
      fields: ['cityId'],
      references: {
        table: 'Cities',
        field: 'id',
      },
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'city_airport_association');
  }
};
