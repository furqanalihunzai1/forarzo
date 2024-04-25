const CrudRepository = require("./crud-repository");
const { merchants } = require("../models");
const { response } = require("express");

class MerchantRepository extends CrudRepository {
    constructor() {
        super(merchants);
    }

    async createUser(phoneNumber, password, purpose) {
        const data = { 
            phoneNumber: phoneNumber, password: password, purpose:purpose };
        const response = await merchants.create(
            data
        );
        return response;
    }

    async getUser(id) {
        const response = await merchants.findOne(
            {
                where: { phoneNumber: id }
            }
        );
        return response;
    }
}




module.exports = MerchantRepository;
