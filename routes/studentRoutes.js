const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST /api/students
router.post('/create', studentController.createStudent);

// GET /api/students
router.get('/getall', studentController.getAllStudents);

// GET /api/students/:id
router.get('/:id', studentController.getStudentById);

// PUT /api/students/:id
router.put('/:id', studentController.updateStudent);

// DELETE /api/students/:id
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
