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
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send({ message: 'Error saving feedback', error });
  }
});

// Endpoint to fetch all feedback
app.get('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.send(feedback);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching feedback', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});