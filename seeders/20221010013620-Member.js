'use strict';

const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const parent = uuid.v4();
    const member = [
      {
        id: parent,
        member: 'Member 1',
        parent_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        member: 'Member 2',
        parent_id: parent,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        member: 'Member 3',
        parent_id: parent,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Members', member, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  },
};
