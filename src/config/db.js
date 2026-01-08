// backend/src/config/db.js
import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "+05:30",
  }
);

export async function syncDB() {
  try {
    await db.authenticate();
    console.log("✅ Database connected");
    await db.sync({}); // creates tables if not exist or updates them
    console.log("✅ Models synced");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    if (error.message.includes("Unknown database")) {
      console.error(`⚠️  Please create the database manually:\n   CREATE DATABASE ${process.env.DB_NAME};`);
    } else if (error.message.includes("Access denied")) {
      console.error("⚠️  Check your DB_USER and DB_PASSWORD in .env file.");
    }
  }
}

export default db;
