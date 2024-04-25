'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class voucherDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  voucherDetails.init({
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    isValid: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true 
    },
    expiryDate: {
       type: DataTypes.DATEONLY, 
      allowNull: false
       },
    amount: { type: DataTypes.BIGINT, defaultValue: 0 
    },
    purpose: { 
      type: DataTypes.STRING, allowNull: false 
    },
    voucherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'voucherDetails',
  });
  return voucherDetails;
};