const readDb = require('./readOps.js');
const writeDb = require('./writeOps.js');

module.exports.getAnswers = (id, page = 1, count = 5) => {
  let query = {
    question_id: parseInt(id),
    reported: 0
  };
  let omitFields = {
    'question_id': 0,
    'answerer_email': 0
  };
  return readDb.getList('answers', query, omitFields, page, count);
};

module.exports.markHelpful = (answer_id) => {
  let filter = { _id : parseInt(answer_id) };
  let updateDoc = {
    $inc: {
      'helpful': 1
    }
  }
  //this updates within the answers collection and returns the answer doc
  //which provides info needed to update the answer where it's embedded in a question doc
  return writeDb.findAndUpdateDoc('answers', filter, {
    $inc: {
      'helpful': 1
    }
  })
    .then((doc) => {
      console.log('found answer', doc);
      let update = { $inc: { "answers.$[elem].helpful": 1 } };
      let arrayFilters = { arrayFilters: [{ "elem._id": parseInt(doc._id) }] };
      return updateWithinQuestion(parseInt(doc.question_id), update, arrayFilters);
    });
};

module.exports.report = (answer_id) => {
  let filter = { answer_id: answer_id };
  let updateDoc = {
    $inc: {
      'report': 1
    }
  }
  //see comments on line 22
  return writeDb.findAndUpdateDoc('answers', filter, updateDoc)
    .then((doc) => {
      let query = [{
        _id: parseInt(doc.question_id),
      },
      { $inc: { "answers.$[elem].reported": 1 } },
      { arrayFilters: [{ "elem._id": doc._id }] }];

      updateWithinQuestion(query);
  })

};

let updateWithinQuestion = (id) => {
  let filter =  {
    _id: id
  }
  console.log('update within question');
  return writeDb.updateDoc('questions', filter, update, options).then((doc) => {
    console.log('found q doc', doc);
    return doc;
  });
};