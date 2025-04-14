const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const ElevenLabs = require('elevenlabs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI and ElevenLabs API keys
const openaiApiKey = process.env.OPENAI_API_KEY;
const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

// Your API routes
app.post('/api/generate-script', async (req, res) => {
    const { prompt } = req.body;

    try {
        // OpenAI API call to generate script
        const script = await generateScript(prompt);
        
        // You can add ElevenLabs text-to-speech here as well
        // ...

        res.json({ script });
    } catch (error) {
        res.status(500).send('Error generating script');
    }
});

async function generateScript(prompt) {
    // Make OpenAI call to generate motivational script (this is just a basic example)
    const response = await openai.Completion.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
    });

    return response.choices[0].text.trim();
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
