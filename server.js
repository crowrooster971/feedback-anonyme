const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/feedback-anonyme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define feedback schema
const feedbackSchema = new mongoose.Schema({
  product: String,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

// Create Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Endpoint to submit feedback
app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body); // Create new feedback instance
    await feedback.save(); // Save feedback to database
    res.status(201).send(feedback); // Respond with created feedback
  } catch (error) {
    res.status(400).send({ message: 'Error saving feedback', error }); // Error handling
  }
});

// Endpoint to fetch all feedback
app.get('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find(); // Fetch all feedback from database
    res.send(feedback); // Respond with the list of feedback
  } catch (error) {
    res.status(500).send({ message: 'Error fetching feedback', error }); // Error handling
  }
});

const PORT = process.env.PORT || 5000; // Define port for server
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start
});