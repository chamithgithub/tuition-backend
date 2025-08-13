const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  class_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  grade_level: { type: String, required: true },
  schedule: { type: String, required: true },
  teacher_id: { type: String, required: true } // Reference to teacher
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
