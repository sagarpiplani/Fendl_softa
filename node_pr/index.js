const express = require('express')
const app = express();
var router = express.Router();
const port = 8000;
var db = require("./connection");
const http = require('http');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// var server = http.createServer(app);

var req = require('./routes');
req(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

//module.exports = app;


