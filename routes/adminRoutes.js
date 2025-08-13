const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/admins', adminController.createAdmin);
router.get('/admins', adminController.getAllAdmins);
router.post('/login', adminController.loginAdmin);

module.exports = router;
