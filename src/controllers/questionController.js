var { Question } = require('../models/schemas');

module.exports.question_list = function (req, res) {
  res.send('NOT IMPLEMENTED: question LIST');
}

module.exports.question_get = function (req, res) {
  res.send(`NOT IMPLEMENTED: GET QUESTION FOR PRODUCT ${req.params.product_id}`);
}

module.exports.question_update_helpful = function (req, res) {
  res.send('NOT IMPLEMENTED: question MARK HELPFUL');
}

module.exports.question_update_report = function (req, res) {
  res.send('NOT IMPLEMENTED: question REPORT');
}