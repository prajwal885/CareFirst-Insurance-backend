import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
console.log("DB URL:", process.env.DATABASE_URL);

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL missing in .env");
  process.exit(1);
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err);
  process.exit(1);
});

export default pool;