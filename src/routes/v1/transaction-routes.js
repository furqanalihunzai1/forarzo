const express = require("express");
const { TransactionController, UserController, WalletController } = require('../../controllers')


const router = express.Router();

router.post('/checkPincode', UserController.checkPincode, TransactionController.twilio, WalletController.addMoneyToWalletInw2wTransfer, WalletController.deleteNotes,  TransactionController.addTransaction);

module.exports = router;