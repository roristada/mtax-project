// utils/db.js
import mysql from "mysql2/promise";

// Create and export a function to get a database connection
// export async function getConnection() {
//   const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'mtax_db',
//   });

//   const connection = await pool.getConnection();
//   return connection;
// }

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "mtax_db",
  
});

export default pool;
