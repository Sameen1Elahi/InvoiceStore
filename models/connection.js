const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uthe@rakh1Q",
    database: "invoice_store",
    namedPlaceholders: true
});

module.exports = connection;