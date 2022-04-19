// server.js
const app = require('./app');

const LoginController = require('./controllers/loginController');

var port = 3000;

app.post('/auth', LoginController.authenticateUser);

app.post('/register', LoginController.registerUser);

app.get('/', function (req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
});

var server = app.listen(port, function () {
	console.log('Express server listening on port ' + port);
});
