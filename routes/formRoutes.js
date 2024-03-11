// routes/formRoutes.js

const express = require('express');
const router = express.Router();

const formController = require('../controllers/formController');

// Route to submit the form
router.post('/submit-form', formController.submitForm);

module.exports = router;
