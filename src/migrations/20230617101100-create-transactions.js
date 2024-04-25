'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      merchantPhoneNumber: {
        type: Sequelize.BIGINT,
        allowNull:false
      },
      userPhoneNumber: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      voucherId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};