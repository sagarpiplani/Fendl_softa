var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: '127.0.0.1',
//   port: "3306",
//   user: 'root',
//   password: '',
//   database:  "softafan_fandlDb"
// });
var con = mysql.createConnection({
  host: 'localhost',
  port: "3306",
  user: 'softafan_fandlDb',
  password: 'softa@12345',
  database:  "softafan_fandlDb"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;