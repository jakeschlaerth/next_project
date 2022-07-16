// server.js
const app = require('./app');

const LoginController = require('./controllers/LoginController');
const PlantController = require('./controllers/PlantController');

var port = 3000;
const host = "0.0.0.0";
// User
app.post('/auth', LoginController.authenticateUser);
app.post('/register', LoginController.registerUser);

// Plants
app.get('/plants', PlantController.getPlants);
app.post('/plants', PlantController.addPlant);
app.put('/plants', PlantController.updatePlant);
app.delete('/plants', PlantController.deletePlant);

var server = app.listen(port, host, () => {
	console.log('Express server listening on port ' + port);
});
