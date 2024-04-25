'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const {ServerConfig}= require('../config');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    walletId: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len : [3,50]
      }
     },
    pincode: { type: DataTypes.INTEGER, allowNull: true}
  }, {
    sequelize,
    modelName: 'users',
  });

  users.beforeCreate(function encrypt(user){
    console.log("User object before encryption", user);
    const encryptedPassword= bcrypt.hashSync(user.password,Number(ServerConfig.SALT_ROUNDS)) ;
    user.password= encryptedPassword;
  });
  return users;
};
