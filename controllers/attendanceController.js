const Attendance = require('../models/Attendance');

// Create a new attendance record
exports.markAttendance = async (req, res) => {
  try {
    const { attendance_id, student_id, date, status } = req.body;

    const existing = await Attendance.findOne({ student_id, date });
    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked for this date.' });
    }

    const newAttendance = new Attendance({ attendance_id, student_id, date, status });
    await newAttendance.save();

    res.status(201).json({ message: 'Attendance marked successfully', attendance: newAttendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    const { status } = req.body;

    const updatedRecord = await Attendance.findOneAndUpdate(
      { attendance_id },
      { status },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance updated successfully', attendance: updatedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;

    const deletedRecord = await Attendance.findOneAndDelete({ attendance_id });

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get attendance by student
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const student_id = req.params.student_id;
    const records = await Attendance.find({ student_id });

    if (!records.length) {
      return res.status(404).json({ message: 'No attendance records found for this student' });
    }

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
