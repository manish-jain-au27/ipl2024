// models/Form.js

const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  selectedBatsmen: {
    type: [String],
    required: true,
  },
  selectedBowlers: {
    type: [String],
    required: true,
  },
  selectedAllRounders: {
    type: [String],
    required: true,
  },
  selectedStarPlayers: {
    type: [String], // Assuming selected star players are also represented by their names
    required: true,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
