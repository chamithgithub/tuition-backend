const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST /api/payments
router.post('/', paymentController.createPayment);

// GET /api/payments
router.get('/', paymentController.getAllPayments);

// GET /api/payments/student/:student_id
router.get('/student/:student_id', paymentController.getPaymentsByStudent);

// DELETE /api/payments/:payment_id
router.delete('/:payment_id', paymentController.deletePayment);

module.exports = router;
