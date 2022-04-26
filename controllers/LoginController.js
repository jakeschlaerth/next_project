const User = require('../models/User');

class LoginController {

	authenticateUser = async (req, res) => {
		try {
			let user = await User.getUserByUsername(req.body.username);
			if (! await User.authenticatePassword(req.body.password, user.password)) {
				throw 'Bad credentials';
			}
			res.status(200).json({
				'jwt': User.generateToken(user),
			});
		} catch (err) {
			console.log(err);
			res.status(401).json({
				'error': err,
			});
		}
	}

	registerUser = async (req, res) => {
		try {
			if (await User.getUserByUsername(req.body.username)) {
				throw 'Username not available';
			}
			await User.register(req.body.username, req.body.password);
			let user = await User.getUserByUsername(req.body.username);
			res.json({
				'jwt': User.generateToken(user),
			});
		} catch (err) {
			console.log(err);
			res.status(400).send(err);
		}
	}
}

module.exports = new LoginController();
