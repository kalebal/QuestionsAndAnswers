const readDb = require('./readOps.js');

module.exports.getAnswers = (id) => {
  let query = { question_id: parseInt(id) };
  return readDb.getList('answers', query, 5);
};