const OpenAI = require('openai');
const { OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const openai = new OpenAIApi('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'); // 여기에 실제 API 키를 넣으세요.

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 4000,
        temperature: 0,
    });
    console.log(response.data);
    if (response.data && response.data.choices) {
        res.json({
            message: response.data.choices[0].text
        });
    }
});

app.listen(port, () => {
    console.log('Example app port: ' + port);
});
