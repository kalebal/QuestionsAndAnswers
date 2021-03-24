require('dotenv').config();

const express = require('express');
const BodyParser = require('body-parser');
const router = require('./routes/index.js');
const dbConnection = require('./dataServices/dbUtil.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/qa/', router);


app.get('/', (req, res) => {
  let url = process.env.CONNECTION_URL;
  res.send(`Hello World! -- you're changing things in docker now, huh??? url=${url}`);
});

dbConnection.connect((err, client) => {
  if (err) {
    console.log('IN APPJS ERROR CONNECTING TO DB');
    console.log(err);
  } else {
    console.log('Connected to db!');
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

