const { IABankRepository } = require("../repositories");
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { response } = require("express");
const { Console } = require("winston/lib/winston/transports");
const { use } = require("../routes");

const iaBankRepo = new IABankRepository();


async function createIssuerBank(data) {
 
    try {
        const response = await iaBankRepo.createBank(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function reduceMoneyFromIssuerBank(data) {

    try {
        const response = await iaBankRepo.reduceMoneyFromIssuerBank(data);
   
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addMoneyToAcquirerBank(data) {

    try {
        const response = await iaBankRepo.addMoneyToAcquirerBank(data);

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = { createIssuerBank, reduceMoneyFromIssuerBank, addMoneyToAcquirerBank };
