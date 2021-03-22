const readDb = require('./readOps.js');
const writeDb = require('./writeOps.js');

module.exports.getAnswers = (id, page = 1, count = 5) => {
  let query = {
    _id: parseInt(id),
  };
  let returnFields = {
    'answers': 1
  };
  return readDb.getList('questions', query, returnFields, page, count);
};

module.exports.markHelpful = (answer_id) => {
  let filter = {
    'answers._id': parseInt(answer_id)
  };
  let updateDoc = {
    $inc: {
      'answers.$[elem].helpful': 1
    }
  }
  let arrayFilters = {
    arrayFilters: [{ 'elem._id': parseInt(answer_id)}]
  }
  return writeDb.updateDoc('questions', filter, updateDoc, arrayFilters);
};

module.exports.report = (answer_id) => {
  let filter = {
    'answers._id': parseInt(answer_id)
  };
  let updateDoc = {
    $inc: {
      'answers.$[elem].report': 1
    }
  }
  let arrayFilters = {
    arrayFilters: [{ 'elem._id': parseInt(answer_id) }]
  }
  return writeDb.updateDoc('questions', filter, updateDoc, arrayFilters);
};
