module.exports.csvPath = '/Users/kaleblyda/HackReactor/sdc/QuestionsAndAnswers/';
const dbPath = 'mongodb://localhost/qa';
const currentDb = 'qatesta'


const mongoose = require('mongoose');
mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('open!');
});




