const { MerchantService, VoucherService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes')
const { Auth } = require('../utils/common');
const { compareSync } = require('bcrypt');
const { Twilio } = require('../utils/common')

async function signup(req, res) {
    try {
        const user = await MerchantService.createUser({
            purpose: req.body.purpose,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
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


async function signin(req, res) {
    try {
        const user = await MerchantService.signin({
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
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

async function twilio(req, res) {
    try {
        const body = {
            to: String(req.body.userPhoneNumber),
            from: '+13612667516',
            message: `Your OTP for payment of Rs. ${req.body.amount} "to"  ${req.body.phoneNumber} "is 706001.`
        };
        const response = Twilio.sendTextMessage(body);
      
        SuccessResponse.data = response;
        return res.status(201).json({
            "success": true,
            "message": `Your OTP for payment of Rs. ${req.body.amount} to ${req.body.phoneNumber} is 706001.`,
            "error": {}
        });
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}

async function acceptPayment(req, res, next) {
    try {
        if(req.body.OTPcode == 706001){
            const user = await VoucherService.updateVoucherBalance({
                phoneNumber: req.body.userPhoneNumber,
                amount: req.body.amount,
                voucherId: req.body.voucherId
            });
            SuccessResponse.data = user;
            console.log(req.body);
            next();
        }
        
        else{
        ErrorResponse.error = "OTP incorrect";
            return res 
                .status(501)
                .json(ErrorResponse)
        }
        
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    signup, signin, twilio, acceptPayment
}