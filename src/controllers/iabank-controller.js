const { response } = require('express');
const { IABankService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createIssuerBank(req, res) {
   
    try {
        const response = await IABankService.createIssuerBank({
            type:"issuerBank",
            phoneNumber: req.body.phoneNumber,
            balance: req.body.balance
        })
        return res.status(201).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

async function createAcquirerBank(req, res) {

    try {
        const response = await IABankService.createIssuerBank({
            type: "acquirerBank",
            phoneNumber: req.body.phoneNumber,
            balance: req.body.balance
        })
        return res.status(201).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

async function addMoneyToAcquirerBank(req, res, next) {
    try {
        const bank = await IABankService.addMoneyToAcquirerBank({
            phoneNumber: req.body.phoneNumber,
            amount: req.body.amount
        });
        SuccessResponse.data = bank;
        // return res.status(201).json(SuccessResponse)
       
        if (bank) {
            next();
        }
    } catch (error) {
        ErrorResponse.error = error
        return res.status(500).json(ErrorResponse)
    }
}
module.exports = {
    createIssuerBank,
    createAcquirerBank,
    addMoneyToAcquirerBank
}