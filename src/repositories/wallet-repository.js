const CrudRepository = require("./crud-repository");
const { WalletCurrency,  users } = require("../models");
const { response } = require("express");

class WalletRepository extends CrudRepository {
    constructor() {
        super(WalletCurrency);
    }

    async addMoneyToWallet(id, value) {
        console.log("addmonrytowallet ", id, value)
        const data = { phoneNumber: id, value: value };
        const response = await WalletCurrency.create(
            data
        );
        return response;
    }


    async getPhoneNumber(id) {
        const response = await users.findOne(
            {
                where: { phoneNumber: id }
            }
        );
        console.log(response);
        return response;
    }

 

    async getWalletInfo(id) {
        console.log(typeof(id));
        const response = await WalletCurrency.findAll(
        {
            where: { phoneNumber: id }
        }
        );
        console.log(response);
        if(!response){

        }
        return response;
    }
    

    
}

module.exports = WalletRepository;
