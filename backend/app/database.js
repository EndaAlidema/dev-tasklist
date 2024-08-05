const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mysql',
    user: 'my_user',
    password: 'my_password',
    database: 'my_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool;