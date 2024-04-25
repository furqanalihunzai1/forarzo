const express = require("express");
const { IABankController } = require('../../controllers')

const router = express.Router();

router.post('/', IABankController.createIssuerBank);

module.exports = router;