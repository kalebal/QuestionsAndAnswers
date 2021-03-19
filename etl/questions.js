const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const csv = require('@fast-csv/parse');
const { Photo, Question, Answer } = require('../models/schemas.js');
const { csvPath, dbPath, db } = require('./config.js');

var questions = [];
let count = 0;
let batchNum = 0;

let stream = fs.createReadStream(csvPath + '/questions.csv')
  .pipe(csv.parse({ headers: headers => headers.map(h => h.trim()) }))
  .on('data', (data) => {
    stream.pause();
    questions.push(data);
    count++;

    if (count > 15000) {
      Question.insertMany(questions).then(() => {
        console.log('inserted -- batch#', batchNum);
        questions = [];
        count = 0;
        batchNum++;
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
    if (questions.length > 0) {
      Question.insertMany(questions).then(() => {
        console.log('final batch inserted');
      }).catch((e) => {
        console.log('error inserting', e);
      });
    }
  });
