import mysql, { PoolOptions } from "mysql2/promise";

const options: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    connectionLimit: 10,
}
let pool: any;

export default {
  getConnection: () => pool.getConnection(),
  init: async () => {
    try {
      pool = await mysql.createPool(options);
      console.info("Database connection success.");
    } catch (error: any) {
      console.error("Failed to connect to the database:", error.message);
    }
  },
  getPool: () => pool,
};