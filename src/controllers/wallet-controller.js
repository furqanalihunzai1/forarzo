const { WalletService, } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');
const { success } = require('../utils/common/error-response');


async function addMoneyToWallet(req, res) {
    try {
        const response = await WalletService.addMoneyToWallet(
            req.body.phoneNumber, req.body.data
        )
        if (response) {
            return res.status(201).json(SuccessResponse)
        }
    } catch (error) {
        return res.status(500).json(ErrorResponse)

}
}

async function addMoneyToWalletInw2wTransfer(req, res,next) {
    try {
        const response = await WalletService.addMoneyToWallet(
            req.body.receiverPhoneNumber, req.body.data
        )
        if (response) {
            next();
        }
    } catch (error) {
        return res.status(500).json(ErrorResponse)

    }
}

async function getWalletBalance(req, res) {
    try {
        const wallet = await WalletService.getWalletBalance(req.body.phoneNumber);
        if(!wallet){
            SuccessResponse.data = 0;
            return res.status(201).json(SuccessResponse)
        }
        SuccessResponse.data = wallet;
        return res.status(201).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse)
    }
}

async function getWalletInfo(req, res) {
    try {
        const wallet = await WalletService.getWalletInfo(req.body.phoneNumber);
        SuccessResponse.data = wallet;
        return res.status(201).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse)
    }
}

async function getWallet(req, res) {
    try {
        const wallet = await WalletService.getWallet(req.body.phoneNumber);
        SuccessResponse.data = wallet;
        return res.status(201).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse)
    }
}


async function deleteNotes(req, res, next) {
    try {
        let w = await WalletService.deleteNotes(req.body.phoneNumber, req.body.data);
        SuccessResponse.data = w;
        next()
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse)
    }
}
async function reduceMoneyFromWallet(req, res) {
    try {
        let w = await WalletService.deleteNotes(req.body.phoneNumber, req.body.data);
        SuccessResponse.data = w;
        return res.status(201).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse)
    }
}

async function getAllNotesWithUsers(req, res) {
    try {
        let w = await WalletService.getAllNotesWithUsers();
        SuccessResponse.data = w;
        return res.status(201).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse)
    }
}

module.exports = {
    addMoneyToWallet, getWallet, deleteNotes, getWalletInfo, getWalletBalance, reduceMoneyFromWallet,
    addMoneyToWalletInw2wTransfer, getAllNotesWithUsers
}