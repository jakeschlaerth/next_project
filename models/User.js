class User {

	constructor() {
		this.db = require('../db');
		this.config = require('config');
		this.bcrypt = require('bcrypt');
		this.jwt = require('jsonwebtoken');
		this.salt_rounds = 10;
	}

	getUserById = async (user_id) => {
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
		return await this.db.query(sql, params);
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
		return await this.db.query(sql, params);
	}

	register = async (username, plaintext_password, email) => {
		const sql = `
			INSERT INTO
				user
			SET
				email = ?
				username = ?,
				password = ?`;
		const params = [
			email,
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
