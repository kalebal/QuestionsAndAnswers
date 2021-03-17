const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const csv = require('@fast-csv/parse');
const { Photo, Question, Answer } = require('./models/schemas.js');


mongoose.connect('mongodb://localhost/q&a', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('open!');
});

var questions = [];
let count = 0;

Promise.all(Object.entries(db.models).map(([k, m]) => m.remove));

//get arr of field names from schema
let headers = Object.keys(Question.schema.paths)
  .filter(k => ['_id', '__v'].indexOf(k) === -1);

let stream = fs.createReadStream(__dirname + '/questions.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', (data) => {
    stream.pause();
    questions.push(data);
    count++;

    if (count > 10000) {
      Question.insertMany(questions).then(() => {
        console.log('inserted');
        questions = [];
        count = 0;
      }).catch((e) => {
        console.log('error inserting', e);
        stream.destroy(e);
      }).then(() => {
        stream.resume();
      });
    } else {
      stream.resume();
    }
  })
  .on('end', () => {
    console.log('finished');
  });