const dbConnection = require('./dbUtil.js');

module.exports.getList = (collection, query, limit = 5) => {
  db = dbConnection.getDatabase();
  return db.collection(collection).find(query).limit(limit).toArray();
};

