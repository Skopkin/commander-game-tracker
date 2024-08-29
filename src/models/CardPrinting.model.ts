import { RowDataPacket } from "mysql2";

// Model for CardPrinting table
export default interface CardPrinting extends RowDataPacket {
    scryId?: string;
    uri?: string;
    commanderOId?: string;
    png?: string;
    art_crop?: string;
    border_crop?: string;
    back_png?: string;
    back_art_crop?: string;
    back_border_crop?: string;
    set_code?: string;
    collector_number?: string;
}