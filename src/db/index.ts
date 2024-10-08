import mysql from "mysql2";
import dbConfig from "../config/db.config";

// Use db configuration to create connection to db
export default mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});