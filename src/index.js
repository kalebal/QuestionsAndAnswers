const express = require('express');
const BodyParser = require('body-parser');
const routes = require('./routes/index.js');
const MongoClient = require("mongodb").MongoClient;
var { DATABASE_NAME, CONNECTION_URL } = require('../config.js');
const app = express();
const port = 3000;



app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/qa/', routes);


app.get('/', (req, res) => {
  res.send(`Hello World! -- you're not looking for questions, are you?`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  MongoClient.connect(CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("personnel");
    console.log("Connected to `" + DATABASE_NAME + "`!");
  });
});

