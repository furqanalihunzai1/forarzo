'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  banks.init({
    type: {type: DataTypes.STRING},
    balance: {type: DataTypes.INTEGER},
    phoneNumber:{type: DataTypes.BIGINT, allowNull:false, primaryKey:true}
  }, {
    sequelize,
    modelName: 'banks',
  });
  return banks;
};