const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const csv = require('@fast-csv/parse');
const { Photo, Question, Answer } = require('../models/schemas.js');
var csvpath = '/Users/kaleblyda/HackReactor/sdc/QuestionsAndAnswers/answers.csv'

mongoose.connect('mongodb://localhost/q&a', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('open!');
});

let buffer = {};
let count = 0;
let batchNum = 0;

let stream = fs.createReadStream(csvpath)
  .pipe(csv.parse({ headers: headers => headers.map(h => h.trim()) }))
  .on('data', (data) => {
    stream.pause();
    count++;
    //add answer to question bucket (or create a bucket)
    if (buffer[data['question_id']]) {
      buffer[data['question_id']].push(data);
    } else {
      buffer[data['question_id']] = [data];
    }
    //when count hits 1000 (?)
    if (count >= 10000) {
      console.log('batch # ', batchNum);
      //empty all the buckets
      var promises = Object.entries(buffer).map(([id, answers]) => {
        Answer.insertMany(answers).then(() => {
          addAnswersToQuestion(id, answers);
          buffer[id] = [];
        }).catch((err) => {
          console.log(err);
        });
      });

      Promise.all(promises)
        .then((res) => {
          console.log(batchNum, 'completed insert');
          batchNum++;
          count = 0;
          buffer = {};
          stream.resume();
        })
        .catch((err) => {
          stream.destroy();
          console.log('err updating', err);
        });
    } else {
      stream.resume();
    }

  })
  .on('error', (err) => {
    console.log('err', err);
  });

  //returns a promise
  let addAnswersToQuestion = (question_id, answers) => {
    let question = Question.findOne({ id: question_id }).then(() => {
      let currentAnswers = question.answers;
      currentAnswers.concat(answers);
      return question.save();
    });
  };
