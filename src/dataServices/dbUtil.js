const MongoClient = require("mongodb").MongoClient;
var { DATABASE_NAME, CONNECTION_URL } = require('../../config.js');


let _database;
module.exports = {
  connect(callback) {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (err, client) => {
      _database = client.db(DATABASE_NAME);
      return callback(err, client);
    });
  },

  getDatabase() {
    return _database;
  }
};
