'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WalletCurrencies', {
     
      phoneNumber: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      srNo:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
      },
      value: {
        type: Sequelize.BIGINT,
        allowNull: false
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
    await queryInterface.dropTable('WalletCurrencies');
  }
};