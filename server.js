const express = require('express');
const { NlpManager } = require('node-nlp');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const manager = new NlpManager({ languages: ['en'] });
manager.load();

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (_, res) => {
    res.send('Running angelo-qna server...');
});

app.options('/angeloqna', cors());
app.post('/angeloqna', cors(), async (req, res) => {
    const response = await manager.process('en', req.body.message);
    res.send({
        answer: response.answers[0].answer
    });
});