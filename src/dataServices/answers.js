const readDb = require('./readOps.js');

module.exports.getAnswers = (id, page = 1, count = 5) => {
  let query = { question_id: parseInt(id) };
  return readDb.getList('answers', query, page, count);
};