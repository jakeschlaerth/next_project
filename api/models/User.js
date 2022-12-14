const Model = require('./Model.js');

class User extends Model {

	constructor() {
		super();
		this.salt_rounds = this.config.get('bcrypt.salt_rounds');
	}

	getUserByUserId = async (user_id) => {
		const sql = `
			SELECT
				id,
				username
			FROM
				user
			WHERE
				id = ?
			LIMIT 1`;
		const params = [user_id];
		const user = await this.db.query(sql, params);
		return user[0];
	}

	getUserByUsername = async (username) => {
		const sql = `
			SELECT
				id,
				username,
				password
			FROM
				user
			WHERE
				username = ?
			LIMIT 1`;

		const params = [username];
		let user = await this.db.query(sql, params);
		return user[0];
	}

	register = async (username, plaintext_password) => {
		const sql = `
			INSERT INTO
				user
			SET
				username = ?,
				password = ?`;
		const params = [
			username,
			await this.hashPassword(plaintext_password),
		];
		return await this.db.query(sql, params);
	}

	hashPassword = async (plaintext_password) => await this.bcrypt.hash(plaintext_password, this.salt_rounds);

	authenticatePassword = async (entered_password, user_password) => await this.bcrypt.compare(entered_password, user_password);

	generateToken = user => {
		delete user.password;
		return this.jwt.sign(user, this.config.get('jwt.private_key'));
	}

	decryptToken = token => this.jwt.verify(token, this.config.get('jwt.private_key'));
}

module.exports = new User();
