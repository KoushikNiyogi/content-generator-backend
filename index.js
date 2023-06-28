const express = require('express');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const cors = require("cors")
const app = express();
const port = 8080;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key
app.use(cors({origin : "*"}))
app.get('/:type', async (req, res) => {
  try {
    const {type} = req.params;
    const {keyword} = req.query;
    console.log(type,keyword)
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `${type} about ${keyword}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const result = response.data.choices[0].text.trim();
    res.json({ result });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
