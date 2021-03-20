var { Question } = require('../models/schemas');
var db = require('../dataServices/questions');

module.exports.question_list = function (req, res) {
  res.send('NOT IMPLEMENTED: question LIST');
}

module.exports.question_get = function (req, res) {
  db.getQuestions(req.params.product_id).then((result) => {
    console.log('result found', result);
    var response = {
      product_id: req.params.product_id,
      results: result
    }
    res.status(200).send(response);
  }).catch((error) => {
    res.status(200).send('error: ' + error);
  });
}

module.exports.question_update_helpful = function (req, res) {
  res.send('NOT IMPLEMENTED: question MARK HELPFUL');
}

module.exports.question_update_report = function (req, res) {
  res.send('NOT IMPLEMENTED: question REPORT');
}

module.exports.add_question = function (req, res) {
  res.send('NOT IMPLEMENTED: ADD QUESTION');
}