const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

// POST /api/parents
router.post('/create', parentController.createParent);

// GET /api/parents
router.get('/getall', parentController.getAllParents);

// GET /api/parents/:id
router.get('/:id', parentController.getParentById);

// PUT /api/parents/:id
router.put('/:id', parentController.updateParent);

// DELETE /api/parents/:id
router.delete('/:id', parentController.deleteParent);

module.exports = router;
