const readDb = require('./readOps.js');

module.exports.getQuestions = (id) => {
  let query = { product_id: parseInt(id) };
  return readDb.getList('questions', query, 5);
};
