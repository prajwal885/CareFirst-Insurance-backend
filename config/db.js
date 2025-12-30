import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

// Catch unexpected errors on idle clients
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Test connection safely
pool.connect()
  .then(client => {
    console.log("PostgreSQL Connected");
    client.release(); // release client immediately
  })
  .catch(err => console.error("DB Error:", err));

console.log("Connecting with:");
console.log("DB_USER =", process.env.DB_USER);
