'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Get the first airplane ID from the database
    const [airplanes] = await queryInterface.sequelize.query(
      "SELECT id FROM Airplanes LIMIT 1"
    );
    
    if (airplanes.length === 0) {
      throw new Error('No airplanes found in database. Please run the airplane seeder first.');
    }
    
    const airplaneId = airplanes[0].id;
    
    await queryInterface.bulkInsert(
      "Seats",
      [
        {
          airplaneId: airplaneId, //airplaneId is the id of the first airplane in the database
          row: 1,
          col: 'A',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 1,
          col: 'B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 1,
          col: 'C',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 1,
          col: 'D',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 1,
          col: 'E',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 1,
          col: 'F',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 2,
          col: 'A',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 2,
          col: 'B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 2,
          col: 'C',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 2,
          col: 'D',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 2,
          col: 'E',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 2,
          col: 'F',
          createdAt: new Date(),
          updatedAt: new Date(),
        },       {
          airplaneId: airplaneId,
          row: 3,
          col: 'A',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 3,
          col: 'B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 3,
          col: 'C',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 3,
          col: 'D',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 3,
          col: 'E',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 3,
          col: 'F',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 4,
          col: 'A',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 4,
          col: 'B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 4,
          col: 'C',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 4,
          col: 'D',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 4,
          col: 'E',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          airplaneId: airplaneId,
          row: 4,
          col: 'F',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};
