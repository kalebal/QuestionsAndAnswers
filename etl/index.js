//check that schemas are created
//check that tables are created

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const csv = require('@fast-csv/parse');
const { Photo, Question, Answer } = require('../models/schemas.js');

mongoose.connect('mongodb://localhost/q&a', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('open!');
});

var answers = [];
let count = 0;

//import answers
let stream = fs.createReadStream(__dirname + '/answers.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', (data) => {
    stream.pause();
    answers.push(data);
    count++;

    if (count > 10000) {
      Answer.insertMany(answers).then(() => {
        console.log('inserted');
        answers = [];
        count = 0;
      }).catch((e) => {
        stream.destroy(e);
      });
    }
    stream.resume();
  })
  .on('end', () => {
    console.log('finished');
  });


//add answers as reference document to questions
//query answer collection -- find all w/ question id of x
//query questions collection -- you'll have one thing to update
//