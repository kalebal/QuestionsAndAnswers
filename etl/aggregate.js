
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


/*
This sets up the mongodb client so aggregates can run using node
*/
MongoClient.connect(url, function (err, db) {
  if (err) throw err;

  db.photos.aggregate({
        $group:
        {
          _id: "$answer_id", photos: { $push: '$url'} //ex: { _id: ~answer#123~ photos: [~url1~, ~url2~]}
        }
      },
      {
        $addFields:
        {
          id: "$_id" //duplicate id field to match answer index
        }
      },
      {
        $unset: '_id' //_id matches the photo _id, will prevent merging with answers (which has a different _id)
      },
      {
        $merge:
        {
          into: 'answers',
          on: 'id', //find where the photo group's answer_id matches an answer's indexed id
          //this adds the photos property to the answer document without changing anything else
        }
      })
});

//same as above minus the comments
db.photos.aggregate({
  $group:
  {
    _id: "$answer_id", photos: { $push: '$url' }
  }
},
  {
    $addFields:
    {
      id: "$_id"
    }
  },
  {
    $unset: '_id'
  },
  {
    $merge:
    {
      into: 'answers',
      on: 'id',
    }
  })


db.answers.aggregate([
  {
    $merge:
    {
      into: 'newCollection',
      whenNotMatched: 'insert'
    }
  }
])


db.newCollection.aggregate(
  {
    $group:
    {_id: "$question_id", answers: { $push: '$$ROOT' }} //root adds the whole document rather than one field
  },
  {
    $addFields:
    {id: "$_id"}
  },
  { $unset: '_id'},
  {
    $merge:
    {
      into: 'questions',
      on: 'id',
    }
  })

//for renaming a property
db.questions.aggregate([
  { $unset: ['answers'] },
  {
    $merge:
    {
      into: 'questions',
      on: '_id',
      whenMatched: 'replace'
    }
  }
])

