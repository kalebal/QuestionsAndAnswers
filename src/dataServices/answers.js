const readDb = require('./readOps.js');

module.exports.getAnswers = (id, page = 1, count = 5) => {
  let query = { question_id: parseInt(id) };
  let omitFields = {
    'question_id': 0,
    'answerer_email': 0
  };
  return readDb.getList('answers', query, omitFields, page, count);
};

module.exports.markHelpful = (answer_id) => {
  let filter = { answer_id: answer_id };
  let updateDoc = {
    $inc: {
      helpful: 1
    }
  }
  return writeDb.updateDoc('answers', filter, updateDoc)
};

module.exports.report = (answer_id) => {
  let filter = { answer_id: answer_id };
  let updateDoc = {
    $inc: {
      report: 1
    }
  }
  return writeDb.updateDoc('answers', filter,)
};