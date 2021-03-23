const readDb = require('./readOps.js');
const writeDb = require('./writeOps.js');

module.exports.getAnswers = (id, page = 1, count = 5) => {
  let query = {
    _id: parseInt(id)
  };
  let returnFields = {
    'answers._id': 1,
    'answers.body': 1,
    'answers.date_written': 1,
    'answers.answerer_name': 1,
    'answers.helpful': 1,
    'answers.photos': 1,
    'answers.reported': 1
  };
  return readDb.getList('Questions', query, returnFields, page, count).then((results) => {
    results[0]['answers'] = results[0]['Answers'].filter((answer) => {
      return answer.reported === 0;
    });
    return results;
  });
};

module.exports.addAnswer = (question_id, newAnswer) => {
  let newDoc = {
    question_id: question_id,
    body: newAnswer.body,
    answerer_name: newAnswer.name,
    answerer_email: newAnswer.email,
    date_written: new Date(),
    helpful: 0,
    reported: 0,
    photos: newAnswer.photos
  };
  let filter = {
    _id: parseInt(question_id)
  }
  let update = {
    $push: {
      'answers': newDoc
    }
  }
  return writeDb.updateDoc('Questions', filter, update);
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
  return writeDb.updateDoc('Questions', filter, updateDoc, arrayFilters);
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
  return writeDb.updateDoc('Questions', filter, updateDoc, arrayFilters);
};
