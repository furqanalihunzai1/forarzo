'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WalletCurrency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WalletCurrency.init({
    phoneNumber: { type: DataTypes.BIGINT, 
      allowNull: false},
    srNo: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    value: { type: DataTypes.BIGINT, allowNull: false}
  }, {
    sequelize,
    modelName: 'WalletCurrency',
  });
  return WalletCurrency;
};