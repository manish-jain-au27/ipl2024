// controllers/formController.js

const Form = require('../models/form');

const submitForm = async (req, res) => {
  const { name, teamName, mobileNumber, selectedBatsmen, selectedBowlers, selectedAllRounders, selectedStarPlayer } = req.body;

  // Validate the number of selected players
  if (
    selectedBatsmen.length !== 5 ||
    selectedBowlers.length !== 4 ||
    selectedAllRounders.length !== 2
  ) {
    return res.status(400).send('Please select exactly 5 batsmen, 4 bowlers, and 2 all-rounders');
  }

  // Validate star player selection
  if (!selectedStarPlayer) {
    return res.status(400).send('Please select a star player');
  }

  try {
    const newForm = new Form({
      name,
      teamName,
      mobileNumber,
      selectedBatsmen,
      selectedBowlers,
      selectedAllRounders,
      selectedStarPlayers: selectedStarPlayer, // Update to match the new schema
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
