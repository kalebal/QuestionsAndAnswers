
var MongoClient = require('mongodb').MongoClient;

/*
This sets up the mongodb client to aggregate using node
*/
MongoClient.connect(process.env.CONNECTION_URL, function (err, db) {
  if (err) throw err;
  var dbo = db.db(process.env.DATABASE_NAME);
  aggregatePhotos(db)
    .then(() => {
    aggegateAnswers(db);
    })
    .catch((err) => {
    console.log(err);
  });
};

function aggregatePhotos (db) {
  db.collection('Photos').aggregate([
    {
      $group:
      {
        _id: "$answer_id", photos: { $push: '$url' }
      }
    },
    {
      $merge:
      {
        into: 'Answers',
        on: '_id',
      }
    }], { "allowDiskUse": true });
};

//this embeds all answers as an array of subdocuments into their respective questions
function aggegateAnswers(db) {
  db.collection('Answers').aggregate([
    {
      $group:
      {_id: "$question_id", answers: { $push: '$$ROOT' }}
    },
    {
      $merge:
      {
        into: 'Questions',
        on: '_id',
      }
    }], { "allowDiskUse": true });
}
