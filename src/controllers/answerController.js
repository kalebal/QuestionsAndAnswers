var db = require('../dataServices/answers');

module.exports.answer_get = function (req, res) {
  var { question_id } = req.params;
  var { page, count } = req.query;
  db.getAnswers(question_id, page, count).then((result) => {
    console.log('result', result);
    var response = {
      question_id: result[0]._id,
      page: req.params.page,
      count: req.params.count,
      results: result[0]['answers']
    }
    res.status(200).send(response);
  }).catch((err) => {
    res.status(200).send(err);
  });
}

module.exports.answer_update_helpful = function (req, res) {
  console.log('answer helpful');
  var { answer_id } = req.params;
  db.markHelpful(answer_id).then((result) => {
    res.status(204).send();
  }).catch((err) => {
    res.status(400).send(err);
  });
}

module.exports.answer_update_report = function (req, res) {
  var { answer_id } = req.params;
  db.report(answer_id).then((result) => {
    res.status(204).send();
  }).catch((err) => {
    res.status(400).send('error');
  });
}

module.exports.add_answer = function (req, res) {
  var { question_id } = req.params;
  var newAnswer =  req.body;
  db.addAnswer(question_id, newAnswer).then(() => {
    res.status(201).send();
  });
}

