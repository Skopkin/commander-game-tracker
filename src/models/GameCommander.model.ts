import { RowDataPacket } from "mysql2";

// Model for GameCommander table
export default interface GameCommander extends RowDataPacket {
    idGame?: number;
    idCommander?: number;
}