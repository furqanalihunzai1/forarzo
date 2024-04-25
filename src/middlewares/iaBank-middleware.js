const { BankController } = require('../controllers')
const { IABankService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function reduceMoneyFromIssuerBank(req, res, next) {
    
    try {
       
        const bank = await IABankService.reduceMoneyFromIssuerBank({
           balance: Number(req.body.amount), 
           phoneNumber: 0
        });
        if (bank) {
            next();
        }    
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse)
    }
}
module.exports = {
    reduceMoneyFromIssuerBank,
}