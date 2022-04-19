class User {

	constructor() {
		this.db = require('../db');
		this.config = require('config');
		this.bcrypt = require('bcrypt');
		this.jwt = require('jsonwebtoken');
		this.salt_rounds = 10;
	}

	getUserByUserId = async (user_id) => {
		const sql = `
			SELECT
				user_id,
				username
			FROM
				user
			WHERE
				user_id = ?
			LIMIT 1`;
		const params = [user_id];
		const user = await this.db.query(sql, params);
		return user[0];
	}

	getUserByUsername = async (username) => {
		const sql = `
			SELECT
				user_id,
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

	authenticatePassword = async (entered_password, user_password) => {
		return await this.bcrypt.compare(entered_password, user_password);
	}

	hashPassword = async (plaintext_password) => {
		return await this.bcrypt.hash(plaintext_password, this.salt_rounds);
	}

	generateToken = user => {
		return this.jwt.sign(user, this.config.get('private_key'));
	}
}

module.exports = new User();
