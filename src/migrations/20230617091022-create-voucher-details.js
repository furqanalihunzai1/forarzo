'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voucherDetails', {
      phoneNumber: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      isValid: {
        defaultValue: true ,
        type: Sequelize.BOOLEAN
      },
      expiryDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      amount: {
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      purpose: {
        allowNull: false,
        type: Sequelize.STRING
      },
      voucherId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('voucherDetails');
  }
};