import connection from "../db";
import CardPrinting from "../models/CardPrinting.model";
import { OkPacket } from "mysql2";

// Interface for CardPrinting CRUD operations
interface ICardPrintingRepository {
    save(printing: CardPrinting): Promise<CardPrinting>;
    //retrieveAll(searchParams: {scryId: string, uri: string, commanderOId: string, png: string, art_crop: string, border_crop: string, back_png: string, back_art_crop: string, back_border_crop: string, set: string, collector_number: string}): Promise<CardPrinting[]>;
    retrieveAllByOID(oracle_id: string): Promise<CardPrinting[]>;
    retrieveById(scryId: string): Promise<CardPrinting | undefined>;
    update(printing: CardPrinting): Promise<number>;
    delete(scryId: string): Promise<number>;
    deleteAll(): Promise<number>;
}

// Implementation of CardPrinting CRUD operations
class CardPrintingRepository implements ICardPrintingRepository {
    // Insert a single Card Printing
    save(printing: CardPrinting): Promise<CardPrinting> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT IGNORE INTO CardPrinting (scryId, uri, png, art_crop, border_crop, back_png, back_art_crop, back_border_crop, set_code, collector_number, commanderOId) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                [printing.scryId, 
                    printing.uri, 
                    printing.png, 
                    printing.art_crop, 
                    printing.border_crop, 
                    printing.back_png ? printing.back_png : null, 
                    printing.back_art_crop ? printing.back_art_crop : null, 
                    printing.back_border_crop ? printing.back_border_crop : null, 
                    printing.set_code,
                    printing.collector_number,
                    printing.commanderOId],
                (err, res) => {
                    if (err) reject(err);
                    else
                        this.retrieveById(printing.scryId ? printing.scryId : "?")
                    .then((printing) => resolve(printing!))
                    .catch(reject);
                }
            );
        });
    }

    // Placeholder to be implemented if needed
    // retrieveAll(searchParams: {scryId: string, uri: string, commanderOId: string, png: string, art_crop: string, border_crop: string, back_png: string, back_art_crop: string, back_border_crop: string, set: string, collector_number: string}): Promise<CardPrinting[]> { 
    //     throw new Error("Method not implemented.");
    // }

    // Select all Card Printings of the same card
    retrieveAllByOID(oracle_id: string): Promise<CardPrinting[]> { 
        return new Promise((resolve, reject) => {
            connection.query<CardPrinting[]>(
                "SELECT * FROM CardPrinting WHERE commanderOId = ?",
                [oracle_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res)
                }
            );
        });
    }

    // Select a single Card Printing
    retrieveById(scryId: string): Promise<CardPrinting | undefined> { 
        return new Promise((resolve, reject) => {
            connection.query<CardPrinting[]>(
                "SELECT * FROM CardPrinting WHERE scryId = ?",
                [scryId],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res?.[0])
                }
            );
        });
    }

    // Placeholder to be implemented if needed
    update(printing: CardPrinting): Promise<number> {
        throw new Error("Method not implemented.");
    }

    // Placeholder to be implemented if needed
    delete(scryId: string): Promise<number> { 
        throw new Error("Method not implemented.");
    }
    
    // Deletes all entries from this table
    deleteAll(): Promise<number> { 
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>("DELETE FROM CardPrinting", (err, res) => {
                if(err) reject(err);
                else resolve(res.affectedRows);
            });
        });
    }

}

export default new CardPrintingRepository();