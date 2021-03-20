const dbConnection = require('./dbUtil.js');


//------- add new document
module.exports.addDoc = (collection, doc) => {
  db = dbConnection.getDatabase();
  return db.collection(collection).insertOne(doc);
};

//------- update document

module.exports.updateDoc = (collection, filter, updateDoc) => {
  db = dbConnection.getDatabase();
  return db.collection(collection).updateOne(filter, updateDoc);
};

module.exports.findAndUpdateDoc = (collection, filter, updateDoc) => {
  db = dbConnection.getDatabase();
  return db.collection(collection).updateOne(filter, updateDoc);
};