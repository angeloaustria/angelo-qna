const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["en"] });
const fs = require("fs");
const files = fs.readdirSync("./data");

for (const file of files) {
    const data = JSON.parse(fs.readFileSync(`./data/${file}`));
    const intent = file.replace(".json", "");
    for (const question of data.questions) {
        manager.addDocument("en", question, intent);
    }
    for (const answer of data.answers) {
        manager.addAnswer("en", intent, answer);
    }
}

async function train_save(){
    await manager.train();
    manager.save();
}

train_save();