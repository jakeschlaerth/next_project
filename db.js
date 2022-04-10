var config = require('config');
var mariadb = require('mariadb');

class Database {
	constructor() {
		this.pool = mariadb.createPool({
			host: config.get('db.host'),
			user: config.get('db.user'),
			password: config.get('db.password'),
			database: config.get('db.schema_name'),
			connectionLimit: 5
		});
	}

	async query(query_string, params) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			let rows = await conn.query(query_string, params);
			conn.end();
			return new Promise((resolve, reject) => {
				if (rows.length > 1) {
					resolve(rows);
				} else if (rows.length == 1) {
					resolve(rows[0])
				} else {
					reject(false);
				}
			});
		}
		catch (err) {
			console.log(err);
		}
	}
}
module.exports = new Database();

