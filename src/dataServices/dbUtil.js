const MongoClient = require("mongodb").MongoClient;

let _database;
module.exports = {
  connect(callback) {
    MongoClient.connect('mongodb://db:27017', { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.log('IN DBUTIL ERROR CONNECTING TO DB');
        console.log(err);
        return callback(err);
      }
      _database = client.db(process.env.DATABASE_NAME);
      return callback(err, client);
    });
  },

  getDatabase() {
    return _database;
  }
};
