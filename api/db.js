const config = require('config');
const mariadb = require('mariadb');

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
			return rows;
		}
		catch (err) {
			console.log(err);
		}
	}
}
module.exports = new Database();

