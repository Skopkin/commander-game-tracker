import { RowDataPacket } from "mysql2";

// Model for Deck table
export default interface Deck extends RowDataPacket {
    idDeck?: number;
    userId?: number;
    commanderId?: number;
    partnerId?: number;
    name?: string;
}