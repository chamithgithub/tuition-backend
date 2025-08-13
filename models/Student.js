const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  admission_date: { type: Date, required: true },
  class_id: { type: String, required: true },   // FK to Class
  parent_id: { type: String, required: true },   // FK to Parent
  role: {
    type: String,
    default: 'student',
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
