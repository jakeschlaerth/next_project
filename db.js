var config = require('config');
var mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: config.get('db.host'), 
    user: config.get('db.user'), 
    password: config.get('db.password'),
    database: config.get('db.schema_name'),
    connectionLimit: 5
});

class Database
{
    constructor()
    {
        const pool = mariadb.createPool({
            host: config.get('db.host'), 
            user: config.get('db.user'), 
            password: config.get('db.password'),
            database: config.get('db.schema_name'),
            connectionLimit: 5
        });
    }

    async query(query_string)
    {
        let conn;
        try 
        {
            conn = await pool.getConnection();
            const rows = await conn.query(query_string);
            console.log(rows); //[ {val: 1}, meta: ... ]
        }
        catch (err)
        {
            console.log(err);
        }
        finally 
        {
            if (conn) return conn.end();
        }
    }
}
module.exports = new Database();

