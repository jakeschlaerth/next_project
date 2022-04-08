// server.js
var app = require('./app');
var port = process.env.PORT || 3000;
const db = require('./db');

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.get('/auth', async function (req, res) {
	let result = await db.query('SELECT * FROM user');
	console.log(result);
});

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});