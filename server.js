const express = require('express');
const { NlpManager } = require('node-nlp');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const manager = new NlpManager({ languages: ['en'] });
manager.load();

app.use(express.json());
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": ["Content-Type"]
  }
app.use(cors(corsOptions));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (_, res) => {
    res.send('Running angelo-qna server...');
});

app.post('/angeloqna', async (req, res) => {
    const response = await manager.process('en', req.body.message);
    res.json({
        answer: response.answers[0].answer
    });
});