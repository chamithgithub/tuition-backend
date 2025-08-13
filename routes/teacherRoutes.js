const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Routes
router.post('/create', teacherController.createTeacher);
router.get('/getall', teacherController.getTeachers);
router.get('/:teacher_id', teacherController.getTeacherById);
router.put('/:teacher_id', teacherController.updateTeacher);
router.delete('/:teacher_id', teacherController.deleteTeacher);
router.post('/login', teacherController.loginTeacher);

module.exports = router;
