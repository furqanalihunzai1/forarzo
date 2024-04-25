'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const { ServerConfig } = require('../config');

module.exports = (sequelize, DataTypes) => {
  class merchants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  merchants.init({
    phoneNumber: {
      type:DataTypes.BIGINT,
      allowNull:false,
      primaryKey: true
    },
    purpose: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    }
  }, {
    sequelize,
    modelName: 'merchants',
  });

  merchants.beforeCreate(function encrypt(merchants) {
    console.log("merchants object before encryption", merchants);
    const encryptedPassword = bcrypt.hashSync(merchants.password, Number(ServerConfig.SALT_ROUNDS));
    merchants.password = encryptedPassword;
  });

  return merchants;
};