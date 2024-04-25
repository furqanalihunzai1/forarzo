'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WalletDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WalletDetails.init({
    phoneNumber: { type: DataTypes.BIGINT, unique: true, allowNull: false },
    walletId: { type: DataTypes.BIGINT },
  
  }, {
  sequelize,
  modelName: 'WalletDetails',
});
return WalletDetails;
};