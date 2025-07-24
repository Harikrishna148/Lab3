const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const math = require('mathjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
  const { expression } = req.body;

  try {
 
    if (/[a-zA-Z$_]/.test(expression)) {
      throw new Error('Invalid characters in expression');
    }

    const result = math.evaluate(expression);
    res.json({ result });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});