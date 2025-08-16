const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/subjectController');

// POST /api/subjects/create
router.post('/create', subjectController.createSubject);
// GET /api/subjects/getall
router.get('/getall', subjectController.getAllSubjects);
// GET /api/subjects/:id
router.get('/:id', subjectController.getSubjectById);
// PUT /api/subjects/:id
router.put('/:id', subjectController.updateSubject);
// DELETE /api/subjects/:id
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
