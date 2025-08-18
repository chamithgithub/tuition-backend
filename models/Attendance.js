const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  attendance_id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true, ref: 'Student' },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
