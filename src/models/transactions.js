'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactions.init({
    merchantPhoneNumber: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    userPhoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    voucherId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amount: {type: DataTypes.BIGINT,
      allowNull:false
    },
    date: {
      type: DataTypes.DATEONLY
    },
    time: {
      type: DataTypes.TIME
    }
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};