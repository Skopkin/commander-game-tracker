import { OkPacket } from "mysql2";
import connection from "../db";
import Commander from "../models/Commander.model";

// Interface for Commander CRUD operations
interface ICommanderRepository {
    save(commander: Commander): Promise<Commander>;
    //retrieveAll(): Promise<Commander[]>;
    retrieveAllByName(searchParams: {name: string}): Promise<Commander[]>;
    retrieveById(idCommander: number): Promise<Commander | undefined>;
    update(commander: Commander): Promise<number>;
    delete(idCommander: number): Promise<number>;
    deleteAll(): Promise<number>;
}

// Implementation of Commander CRUD operations
class CommanderRepository implements ICommanderRepository {
    // Insert a single Commander
    save(commander: Commander): Promise<Commander> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT IGNORE INTO Commander (name, oracle_id, keywords, type_line, gatherer, edhrec) VALUES(?, ?, ?, ?, ?, ?)",
                [commander.name, commander.oracle_id, commander.keywords ? commander.keywords : null, commander.type_line, commander.gatherer ? commander.gatherer : null, commander.edhrec ? commander.edhrec : null],
                (err, res) => {
                    if (err) reject(err);
                    else
                        this.retrieveById(res.insertId)
                        .then((commander) => resolve(commander!))
                        .catch(reject);
                }
            );
        });
    }

    // Select all commanders by name
    retrieveAllByName(searchParams: {name: string}): Promise<Commander[]> { 
        return new Promise((resolve, reject) => {
            connection.query<Commander[]>(
                "SELECT * FROM Commander WHERE name = ?",
                [name],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res)
                }
            );
        });
    }
    
    // Select Commanders by id
    retrieveById(idCommander: number): Promise<Commander> { 
        return new Promise((resolve, reject) => {
            connection.query<Commander[]>(
                "SELECT * FROM Commander WHERE idCommander = ?",
                [idCommander],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res?.[0])
                }
            );
        });
    }

    // Placeholder to be implemented if needed
    update(commander: Commander): Promise<number> {
        throw new Error("Method not implemented.");
    }

    // Placeholder to be implemented if needed
    delete(idCommander: number): Promise<number> { 
        throw new Error("Method not implemented.");
    }

    // Delete all entries from this table
    deleteAll(): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>("DELETE FROM Commander", (err, res) => {
              if (err) reject(err);
              else resolve(res.affectedRows);
            });
        });
    }
}

export default new CommanderRepository();