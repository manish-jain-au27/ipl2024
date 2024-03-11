const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');
const Form = require('../models/form');

const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create a new admin
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error registering admin:', error.message);
        res.status(500).send('Server Error');
    }
};

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token with admin username
        const token = jwt.sign({ username: admin.username }, 'your_secret_key', { expiresIn: '1h' });

        // Return the token in the response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in admin:', error.message);
        res.status(500).send('Server Error');
    }
};

const getAllFormData = async (req, res) => {
    try {
        // Fetch all form data
        const formData = await Form.find();
        res.status(200).json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error.message);
        res.status(500).send('Server Error');
    }
};



const editForm = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // Find form by ID
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Update form name
        form.name = name;
        await form.save();

        res.status(200).json({ message: 'Form updated successfully' });
    } catch (error) {
        console.error('Error editing form:', error.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    registerAdmin,
    adminLogin,
    getAllFormData,
    editForm,
};