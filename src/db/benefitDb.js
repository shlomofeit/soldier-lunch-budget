import mysql from "mysql2/promise";

export const budgetPool = mysql.createPool({
  host: process.env.MYSQL_HOST || "mysql-db",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_BUDGET_DATABASE,
});

export const transactionPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_TRANSACTION_DATABASE,
});
