import { RowDataPacket } from "mysql2";

// Model for Commander table
export default interface Commander extends RowDataPacket {
    idCommander?: number;
    name?: string;
    oracle_id?: string;
    keywords?: string;
    type_line?: string;
    gatherer?: string;
    edhrec?: string;
}