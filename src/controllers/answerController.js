var db = require('../dataServices/answers');

module.exports.answer_get = function (req, res) {
  db.getAnswers(req.params.question_id).then((result) => {
    console.log('result found', result);
    res.status(200).send(result);
  }).catch((err) => {
    res.status(200).send('error');
  });
}

module.exports.answer_update_helpful = function (req, res) {
  res.send('NOT IMPLEMENTED: ANSWER MARK HELPFUL');
}

module.exports.answer_update_report = function (req, res) {
  res.send('NOT IMPLEMENTED: ANSWER REPORT');
}

module.exports.add_answer = function (req, res) {
  res.send('NOT IMPLEMENTED: ADD ANSWER');
}

