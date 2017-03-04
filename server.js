var express = require('express')
var app = express()
var db = require('database.js')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


// Establish connection to db
db.open(function(err, db) {
  assert.equal(null, err);
	console.log('Database opened!');
	db.collection('users', function(err, collection) {
		if (err) {
			throw err;
		} else {
			collection.find({password:"123"}, function(err, document) {
			console.log(document);
			});
		}
		db.close();
	});
  });
