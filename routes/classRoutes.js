const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// POST /api/classes
router.post('/create', classController.createClass);

// GET /api/classes
router.get('/getall', classController.getAllClasses);

// GET /api/classes/:id
router.get('/:id', classController.getClassById);

// PUT /api/classes/:id
router.put('/:id', classController.updateClass);

// DELETE /api/classes/:id
router.delete('/:id', classController.deleteClass);

module.exports = router;
