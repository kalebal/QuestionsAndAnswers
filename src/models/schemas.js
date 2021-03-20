const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  _id: Number,
  answer_id: Number,
  url: String
});

const answerSchema = new mongoose.Schema({
  _id: Number,
  question_id: Number,
  body: String,
  date: { type: Date, default: Date.now },
  answerer_name: String,
  helpfulness: Number,
  reported: { type: Number, default: 0 },
  photos: [photoSchema]
});

const questionSchema = new mongoose.Schema({
  _id: Number,
  product_id: Number,
  body: String,
  date: { type: Date, default: Date.now },
  asker_name: String,
  asker_email: String,
  helpfulness: Number,
  reported: { type: Number, default: 0 },
  answers: [answerSchema]
});

const Photo = mongoose.model('Photo', photoSchema);
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);

module.exports = {
  Photo: Photo,
  Question: Question,
  Answer: Answer
}