// server.js
const app = require('./app');

const LoginController = require('./controllers/LoginController');
const PlantController = require('./controllers/PlantController');

var port = 3000;

app.post('/auth', LoginController.authenticateUser);

app.post('/register', LoginController.registerUser);

app.get('/plants', PlantController.getPlants);

var server = app.listen(port, function () {
	console.log('Express server listening on port ' + port);
});
