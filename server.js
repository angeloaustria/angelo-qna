const express = require('express');
const { NlpManager } = require('node-nlp');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const manager = new NlpManager({ languages: ['en'] });
manager.load();

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (_, res) => {
    res.send('Running angelo-qna server...');
});

app.post('/angeloqna', async (req, res) => {
    const response = await manager.process('en', req.body.message);
    res.send({
        answer: response.answers[0]?.answer ?? 'Sorry, I have not been trained to answer your question.',
        intent: response.intent ?? 'response.unknown'
    });
});