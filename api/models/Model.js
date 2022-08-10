class Model {
	constructor() {
		this.db = require('../db');
		this.config = require('config');
		this.bcrypt = require('bcrypt');
		this.jwt = require('jsonwebtoken');
	}
}

module.exports = Model;
