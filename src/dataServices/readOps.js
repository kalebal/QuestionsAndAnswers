const dbConnection = require('./dbUtil.js');

module.exports.getList = (collection, query, fields, page, count) => {
  db = dbConnection.getDatabase();
  return db.collection(collection).find(query)
  .project(fields)
  .skip((page - 1) * count)
  .limit(count).toArray();
};

