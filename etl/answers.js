const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('@fast-csv/parse');
const { Photo, Question, Answer } = require('../models/schemas.js');
const { csvPath, db } = require('./config.js');

let buffer = {};
let answerArr = [];
let count = 0;
let batchNum = 0;


let stream = fs.createReadStream(csvPath + 'answers.csv')
  .pipe(csv.parse({
    headers: headers => headers.map(h => h.trim())
  }))
  .on('data', (data) => {
    stream.pause();
    count++;
    //add answer to question bucket (or create a bucket)
    if (buffer[data.question_id]) {
      buffer[data.question_id].push(data);
    } else {
      buffer[data.question_id] = [data];
    }
    //checking the lambda value -- when the chain is long, insert and empty that buffer
    if (buffer[data.question_id].length >= 10) {
      console.log(`inserting ${buffer[data.question_id].length} into`, data.question_id);
      let answers = buffer[data.question_id];
      return Answer.insertMany(answers)
        .then(() => {
          count -= buffer[data.question_id].length;
          buffer[data.question_id] = [];
          stream.resume();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //catches the leftovers that don't have 10 answers per question
      if (count >= 10000) {
        console.log('batch add');
        batchAdd(buffer).then(() => {
          buffer = {};
          count = 0;
          stream.resume();
        });
      } else {
        stream.resume();
      }
    }

  })
  .on('error', (err) => {
    console.log('err', err);
  })
  .on('end', () => {
    //add all the leftovers still in the HT
    batchadd(buffer);
  });



let batchAdd = (buffer) => {
  var promises = Object.entries(buffer).map(([id, answers]) => {
    return Answer.insertMany(answers)
      .catch((err) => {
        console.log(err);
      });
  });

  return Promise.all(promises)
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
};

