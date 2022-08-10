// server.js
const app = require('./app');
const config = require('config');

const LoginController = require('./controllers/LoginController');

app.get('/', (req, res) => {
	console.log('hello!');
	res.status(200).json({
		':)': '<3',
	});
});

// User
app.post('/auth', LoginController.authenticateUser);
app.post('/register', LoginController.registerUser);

const port = config.get('server.port');
const host = config.get('server.host');

var server = app.listen(port, host, () => {
	console.log('Express server listening on port ' + port);
});
