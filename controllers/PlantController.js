const User = require('../models/User');
const Plant = require('../models/Plant');
const Controller = require('./Controller');
class PlantController extends Controller {

	getPlants = async (req, res) => {
		try {
			const user = User.decryptToken(req.headers.authorization.replace('Bearer ', ''));
			const plants = await Plant.getPlants(user.user_id);
			res.json(plants);
		} catch (err) {
			console.log(err);
			res.status(401).send(err);
		}
	}

	addPlant = async (req, res) => {
		try {
			const user = User.decryptToken(req.headers.authorization.replace('Bearer ', ''));
			await Plant.addPlant([
				user.user_id,
				req.body.name,
				req.body.water_period
			]);
			res.json('hooray!');
		} catch (err) {
			console.log(err);
			res.status(401).send(err);
		}
	}

	updatePlant = async (req, res) => {
		try {
			const user = User.decryptToken(req.headers.authorization.replace('Bearer ', ''));
			await Plant.updatePlant([
				req.body.name,
				req.body.water_period,
				req.body.plant_id
			]);
			res.json('hooray!');
		} catch (err) {
			console.log(err);
			res.status(401).send(err);
		}
	}

	deletePlant = async (req, res) => {
		try {
			const user = User.decryptToken(req.headers.authorization.replace('Bearer ', ''));
			await Plant.deletePlant(req.body.plant_id);
			res.json('RIP');
		} catch (err) {
			console.log(err);
			res.status(401).send(err);
		}
	}
}

module.exports = new PlantController();
