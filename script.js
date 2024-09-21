const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "uthe@rakh1Q",
  database: "invoice_store",
  namedPlaceholders: true
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

const invoiceTable = `CREATE TABLE invoice_store.invoice (
  id INT NOT NULL AUTO_INCREMENT,
  made_by VARCHAR(45) NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(45) NULL,
  quantity VARCHAR(45) NULL,
  invoicecol INT NOT NULL,
  price INT NULL,
  total_price INT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  deleted_at DATETIME NULL,
  PRIMARY KEY (id));`;


const paymentTable = `CREATE TABLE invoice_store.payment (
  id INT NOT NULL AUTO_INCREMENT,
  invoice_id INT NOT NULL,
  by_cash VARCHAR(45) NULL,
  by_card VARCHAR(45) NULL,
  total_payment VARCHAR(45) NULL,
  paymentcol INT NULL,
  given_by_customer INT NULL,
  PRIMARY KEY (id));`;


const productsTable = `CREATE TABLE invoice_store.products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  remaining_qty INT NOT NULL,
  PRIMARY KEY (id));`;

  const userTable = `CREATE TABLE invoice_store.user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));`;



connection.query(invoiceTable, (err, result) => {
  if (err) throw err;
  console.log('Invoice Table created successfully.');
});

connection.query(paymentTable, (err, result) => {
    if (err) throw err;
    console.log('Payment Table created successfully.');
});

connection.query(productsTable, (err, result) => {
    if (err) throw err;
    console.log('Products Table created successfully.');
});

connection.query(userTable, (err, result) => {
    if (err) throw err;
    console.log('User Table created successfully.');
});

// Close the connection
//connection.end();