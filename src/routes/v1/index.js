const express = require('express')

const { InfoController } = require('../../controllers')
const userRoutes= require('./user-routes');
const transactionRoutes= require('./transaction-routes');
const iabankRoutes= require('./iabank-routes');
const voucherRoutes= require('./voucher-routes');
const merchantRoutes=require('./merchant-routes');

const router = express.Router()

router.get('/info', InfoController.info);

router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes );
router.use('/iabanks', iabankRoutes);
router.use('/vouchers', voucherRoutes);
router.use('/merchants', merchantRoutes);

module.exports = router;