const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// POST /api/attendance
router.post('/create', attendanceController.markAttendance);

// GET /api/attendance
router.get('/getall', attendanceController.getAllAttendance);

// PUT /api/attendance/:attendance_id
router.put('/:attendance_id', attendanceController.updateAttendance);

// DELETE /api/attendance/:attendance_id
router.delete('/:attendance_id', attendanceController.deleteAttendance);

// GET /api/attendance/student/:student_id
router.get('/student/:student_id', attendanceController.getAttendanceByStudent);

module.exports = router;
