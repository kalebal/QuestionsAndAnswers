const readDb = require('./readOps.js');

module.exports.getQuestions = (page = 1, count = 5) => {
  let query = { product_id: parseInt(id) };
  return readDb.getList('questions', query, page, count);
};
