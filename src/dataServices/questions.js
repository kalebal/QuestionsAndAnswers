const readDb = require('./readOps.js');
const writeDb = require('./writeOps.js');

module.exports.getQuestions = (id, page = 1, count = 5) => {
  let query = {
    product_id: parseInt(id),
    reported: 0
  };
  let omitFields = {
    'product_id': 0,
    'asker_email': 0
  };
  return readDb.getList('questions', query, omitFields, page, count);
};

module.exports.addQuestion = () => {

};

module.exports.markHelpful = (question_id) => {
  let filter = { question_id: question_id};
  let updateDoc = {
    $inc: {
      helpful: 1
    }
  }
  return writeDb.updateDoc('questions', filter, updateDoc)
};

module.exports.report = (question_id) => {
  let filter = { question_id: question_id };
  let updateDoc = {
    $inc: {
      report: 1
    }
  }
  return writeDb.updateDoc('questions', filter,)
};
