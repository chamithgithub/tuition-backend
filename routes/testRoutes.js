const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// POST /api/tests
router.post('/', testController.createTest);

// GET /api/tests
router.get('/', testController.getAllTests);

// GET /api/tests/class/:class_id
router.get('/class/:class_id', testController.getTestsByClass);

module.exports = router;
