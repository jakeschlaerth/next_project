const User = require('../models/User');

class LoginController {
	authenticateUser = async (req, res) => {
		try {
			let user = await User.getUserByUsername(req.body.username);
			if (! await User.authenticatePassword(req.body.password, user.password)) {
				throw "Bad credentials";
			}
			res.status(200).json({ "jwt": User.generateToken(user) });
		} catch (err) {
			res.status(401).send(err);
		}
	}

	registerUser = async (req, res) => {
		try {
			if (req.body.password != req.body.password_confirm) {
				throw "Passwords don't match";
			}
			if (await User.getUserByUsername(req.body.username)) {
				throw "Username not available";
			}
			const result = await User.register(req.body.username, req.body.password, req.body.email);
			res.json(result);
		} catch (err) {
			res.status(400).send(err);
		}
	}
}

module.exports = new LoginController();
