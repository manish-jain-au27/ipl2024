const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for admin login
router.post('/login', adminController.adminLogin);

// Route for getting all forms
router.get('/forms', adminController.getAllFormData);

// Route for editing a form (only accessible to admin)
router.put('/forms/:id', authMiddleware, adminController.editForm);

module.exports = router;
