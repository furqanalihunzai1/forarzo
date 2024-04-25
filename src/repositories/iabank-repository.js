const CrudRepository = require("./crud-repository");
const { banks } = require("../models");
const { response } = require("express");

class IABankRepository extends CrudRepository {
    constructor() {
        super(banks);
    } 

    async createBank(data) {
       
        data.phoneNumber = Number(data.phoneNumber);
        data.balance = Number(data.balance);
        const response = await banks.create(
            data
        );
        return response;
    }

    async reduceMoneyFromIssuerBank(data){
       
        let response = await banks.findOne(
            {
                where: { phoneNumber: data.phoneNumber },
            }
        );
        
        response = await banks.update({
           balance: response.balance- data.balance
        }, {
            where: {
                phoneNumber: data.phoneNumber
            }
        }
        );
   
        return response;
    }

    async addMoneyToAcquirerBank(data) {

        let response = await banks.findOne(
            {
                where: { phoneNumber: data.phoneNumber },
            }
        );
        console.log(response);
        response = await banks.update({
            balance: Number(response.balance) + Number(data.amount)
        }, {
            where: {
                phoneNumber: data.phoneNumber
            }
        }
        );

        return response;
    }

}
module.exports = IABankRepository;
