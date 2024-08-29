import { RowDataPacket } from "mysql2";

// Model for User table
export default interface User extends RowDataPacket {
    idUser?: number;
    username?: string;
}