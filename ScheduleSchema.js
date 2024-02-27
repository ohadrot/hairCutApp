const mongoose = require('mongoose');

// Define Appointment Schema
const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

// Define Day Schema
const daySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  appointments: [appointmentSchema], // Array of appointments for the day
  // Add other day-specific fields if needed
});

// Define Month Schema
const monthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  days: [daySchema],
  // Add other month-specific fields if needed
});

// Define Year Schema
const yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  months: [monthSchema],
  // Add other year-specific fields if needed
});

// Create a mongoose model for the Year schema
const yearModel = mongoose.model('Year', yearSchema);

module.exports = yearModel;
