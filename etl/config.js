module.exports.csvPath = '/Users/kaleblyda/HackReactor/sdc/QuestionsAndAnswers/';
const dbPath = 'mongodb://localhost/qatest';
const currentDb = 'qatest'


const mongoose = require('mongoose');
mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('open!');
});


const { MongoClient } = require('mongodb');
var uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("qatest").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
module.exports.client = client;
