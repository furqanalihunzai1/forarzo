const { VoucherService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes')
const { Auth } = require('../utils/common');


async function createVoucher(req, res) {
    try {
        const user = await VoucherService.createVoucher({
            phoneNumber: req.body.phoneNumber,
            amount: req.body.amount,
            expiryDate: req.body.expiryDate,
            purpose: req.body.purpose,
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function resendVoucher(req, res) {
    try {
        
        const user = await VoucherService.updateVoucher({
            phoneNumber: req.body.phoneNumber,            
            expiryDate: req.body.expiryDate,
            voucherId: req.body.voucherId
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getVoucher(req, res) {
    try {
        const user = await VoucherService.getVoucher({
            phoneNumber: req.body.phoneNumber
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = { createVoucher, resendVoucher, getVoucher };