var db = require('../dataServices/questions');

module.exports.question_get = function (req, res) {
  var { product_id, page, count } = req.query;
  db.getQuestions(product_id, page, count).then((result) => {
    var response = {
      product_id: req.query.product_id,
      results: result
    }
    res.status(200).send(response);
  }).catch((error) => {
    res.status(200).send('error: ' + error);
  });
}

module.exports.question_update_helpful = function (req, res) {
  var { question_id } = req.params;
  db.markHelpful(question_id).then((result) => {
    res.status(204).send();
  }).catch((err) => {
    res.status(400).send(err);
  });
}

module.exports.question_update_report = function (req, res) {
  var { question_id } = req.params;
  db.report(question_id).then((result) => {
    res.status(204).send();
  }).catch((err) => {
    res.status(400).send(err);
  });
}

module.exports.add_question = function (req, res) {
  db.addQuestion(req.body).then(() => {
    res.status(201).send();
  }).catch((err) => {
    res.status(400).send(err);
  });
}


