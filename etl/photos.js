const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const csv = require('@fast-csv/parse');
const { Photo, Answer } = require('../models/schemas.js');
const { csvPath, db } = require('./config.js');
var csvpath = '/Users/kaleblyda/HackReactor/sdc/QuestionsAndAnswers/answers_photos.csv'

let buffer = {};
let count = 0;
let batchNum = 0;

let stream = fs.createReadStream(csvpath)
  .pipe(csv.parse({ headers: headers => headers.map(h => h.trim())}))
  .on('data', (data) => {
    stream.pause();
    count++;
    //add photo to question bucket (or create a bucket)
    if (buffer[data['answer_id']]) {
      buffer[data['answer_id']].push(data);
    } else {
      buffer[data['answer_id']] = [data];
    }
    //when count hits 1000 (?)
    if (count >= 10000) {
      console.log('batch # ', batchNum);
      //empty all the buckets
      var promises = Object.entries(buffer).map(([id, photos]) => {
        Photo.insertMany(photos).then(() => {
          //addPhotosToQuestion(id, photos);
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
  })
  .on('end', () => {
    var promises = Object.entries(buffer).map(([id, photos]) => {
      Photo.insertMany(photos).then(() => {
        //addPhotosToQuestion(id, photos);
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
  });

//returns a promise
let addPhotosToAnswer = (answer_id, photos) => {
  let answer = Answer.findOne({ id: answer_id }).then(() => {
    let currentPhotos = answer.photos;
    currentPhotos.concat(photos);
    return answer.save();
  });
};


module.exports.insertAndUpdate = (buffer) => {
  Object.entries(buffer).map(([id, photos]) => {
    Answer.insertMany(photos).then(() => {
      addPhotosToAnswer(id, photos);
      buffer[id] = [];
    }).catch((err) => {
      console.log(err);
    });
  });
}
