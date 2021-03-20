const dbConnection = require('./dbUtil.js');

module.exports.getList = (collection, query, page, count) => {
  db = dbConnection.getDatabase();
  return db.collection(collection).find(query)
  .skip( page > 1 ? ((pageNumber - 1) * count) : 0)
  .limit(count).toArray();
};

