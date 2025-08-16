const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  test_id: { type: String, required: true, unique: true },
  class_id: { type: String, required: true, ref: 'Class' },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
