const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

// GET transaksi berdasarkan ID
router.get('/:id', transactionController.getById);

// POST buat transaksi baru
router.post('/', transactionController.create);

module.exports = router;
