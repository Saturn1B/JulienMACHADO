const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'sql11.freemysqlhosting.net', // Your MySQL host
  user: 'sql11645167',      // Your MySQL username
  password: '84Y7pdN263', // Your MySQL password
  database: 'sql11645167', // Your MySQL database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;