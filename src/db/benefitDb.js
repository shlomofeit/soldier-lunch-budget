import mongoose from "mongoose";
import mysql from "mysql2/promise";

export const pool1 = mysql.createPool({
  host: process.env.MYSQL_HOST || "mysql-db",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_BUDGET_DATABASE,
});

export const pool2 = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_TRANSACTION_DATABASE,
});

const result = await Benefit_records.insertOne({ name: "Shlomo" });
console.log(result);

async function createCheck() {
  try {
    const query = `INSERT INTO allocations (unit, benefitType, month, allocatedAmount) VALUES (?, ?, ?, ?)`;
    const val = ["stam", "a", "2026-06", 100];
    const result = await pool1.execute(query, val);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

await createCheck();
