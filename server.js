const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/feedback-anonyme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const feedbackSchema = new mongoose.Schema({
  product: String,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/feedback', async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.status(201).send(feedback);
});

app.get('/feedback', async (req, res) => {
  const feedback = await Feedback.find();
  res.send(feedback);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});