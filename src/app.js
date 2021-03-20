const express = require('express');
const BodyParser = require('body-parser');
const router = require('./routes/index.js');
const dbConnection = require('./dataServices/dbUtil.js');
const app = express();
const port = 3000;



app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/qa/', router);


app.get('/', (req, res) => {
  res.send(`Hello World! -- you're not looking for questions, are you?`);
});

dbConnection.connect((err, client) => {
  if (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

});

