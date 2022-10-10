'use strict';

const uuid = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const parent = uuid.v4();
    const member = [
      {
        id: parent,
        member_id: 'Member 1',
        parent: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        member_id: 'Member 2',
        parent: parent,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        member_id: 'Member 3',
        parent: parent,
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
