const express = require('express');
const path = require('path');
const { computeBmi, bmiCategory } = require('./logic');
const { version } = require('../package.json');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health check: the pipeline calls this to see if the app is alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: version });
});

// The main feature of the app
app.post('/api/calculate', (req, res) => {
  try {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const bmi = computeBmi(weight, height);
    const category = bmiCategory(bmi);
    res.json({ bmi: bmi, category: category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
