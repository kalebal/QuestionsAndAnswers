const dbConnection = require('./dbUtil.js');

module.exports.getList = (collection, query, fields, page, count = 5) => {
  db = dbConnection.getDatabase();
  return db.collection(collection).find(query)
  .limit(count)
  .project(fields)
  .skip((page - 1) * count)
  .limit(count).toArray();
};

