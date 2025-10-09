const { MongoClient } = require('mongodb');


const url = 'mongodb+srv://usrTarefas:senna220@cluster0.d57rcct.mongodb.net/';
const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  return client.db('agenda');
}

module.exports = { conectarDb };



