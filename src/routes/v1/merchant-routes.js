const express = require("express");
const { MerchantController, IABankController, TransactionController } = require('../../controllers')


const router = express.Router();

router.post('/', MerchantController.signup);
router.post('/signin', MerchantController.signin);
router.post('/addBank', IABankController.createAcquirerBank);
router.get('/requestOTP', MerchantController.twilio);
router.post('/acceptPayment', MerchantController.acceptPayment, IABankController.addMoneyToAcquirerBank, TransactionController.addTransaction);

module.exports = router;