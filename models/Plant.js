const Model = require('./Model.js');
const User = require('../models/User');

class Plant extends Model {

	getPlants = async user_id => {
		const sql = `
			SELECT
				*
			FROM
				plant
			WHERE
				user_id = ?
				AND active = 1`;
		const params = [
			user_id
		];
		return await this.db.query(sql, params);
	}

	addPlant = async params => {
		const sql = `
			INSERT INTO
				plant
			SET
				name = ?,
				user_id = ?,
				water_period = ?`;
		return await this.db.query(sql, params);
	}

	updatePlant = async params => {
		const sql = `
			UPDATE
				plant
			SET
				name = ?,
				water_period = ?
			WHERE
				plant_id = ?`;
		return await this.db.query(sql, params);
	}

	deletePlant = async plant_id => {
		const sql = `
			UPDATE
				plant
			SET
				active = 0,
				deleted_at = NOW()
			WHERE
				plant_id = ?`;
		const params = [
			plant_id
		];
		return await this.db.query(sql, params);
	}
}

module.exports = new Plant();
