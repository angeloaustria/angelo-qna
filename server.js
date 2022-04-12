const express = require('express');
const { NlpManager } = require('node-nlp');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const manager = new NlpManager({ languages: ['en'] });
manager.load();

app.use(express.json());
const corsOptions = {
    origin: 'https://angelo-qna.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (_, res) => {
    res.send('Running angelo-qna server...');
});

app.post('/angeloqna', cors(corsOptions), async (req, res) => {
    const response = await manager.process('en', req.body.message);
    res.send({
        answer: response.answers[0].answer
    });
});