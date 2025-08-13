const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacher_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String },
  subject_specialty: { type: String },
  joining_date: { type: Date, required: true },
  admin_id: { type: String, required: true }, // FK (assumes admin_id is string)
  role: {
    type: String,
    default: 'teacher',
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
