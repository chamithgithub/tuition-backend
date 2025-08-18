const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { payment_id, student_id, amount, status } = req.body;

    const newPayment = new Payment({
      payment_id,
      student_id,
      amount,
      status
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment recorded successfully', payment: newPayment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payments by student ID
exports.getPaymentsByStudent = async (req, res) => {
  try {
    const studentId = req.params.student_id;
    const payments = await Payment.find({ student_id: studentId });

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this student' });
    }

    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete payment by ID
exports.deletePayment = async (req, res) => {
  try {
    const result = await Payment.deleteOne({ payment_id: req.params.payment_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
