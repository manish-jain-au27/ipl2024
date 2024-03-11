// controllers/formController.js

const Form = require('../models/form');

const submitForm = async (req, res) => {
  const { name, teamName, mobileNumber, selectedBatsmen, selectedBowlers, selectedAllRounders } = req.body;

  // Validate the number of selected players
  if (
    selectedBatsmen.length !== 5 ||
    selectedBowlers.length !== 4 ||
    selectedAllRounders.length !== 2
  ) {
    return res.status(400).send('Please select exactly 5 batsmen, 4 bowlers, and 2 all-rounders');
  }

  try {
    const newForm = new Form({
      name,
      teamName,
      mobileNumber,
      selectedBatsmen,
      selectedBowlers,
      selectedAllRounders,
    });
    await newForm.save();

    res.status(200).json({
      message: 'Form data saved successfully',
      formData: newForm,
    });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  submitForm,
};