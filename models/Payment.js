const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true, ref: 'Student' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'unpaid', 'pending'], default: 'pending' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
