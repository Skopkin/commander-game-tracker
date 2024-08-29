import { RowDataPacket } from "mysql2";

// Model for Game table
export default interface Game extends RowDataPacket {
    idGame?: number;
    deckId?: number;
    game_length?: number;
    player2?: string;
    player3?: string;
    player4?: string;
    first_player?: string;
    first_player_win?: boolean;
    fast_mana_present?: boolean;
    first_mana_win?: boolean;
    date?: Date;
    winner?: string;
}