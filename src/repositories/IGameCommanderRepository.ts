import connection from "../db";
import GameCommander from "../models/GameCommander.model";

interface IGameCommanderRepository {
    save(gameCommander: GameCommander): Promise<GameCommander>;
    retrieveAll(searchParams: {idGame: number, idCommander: number}): Promise<GameCommander[]>;
    retrieveByGameId(idGame: number): Promise<GameCommander | undefined>;
    update(gameCommander: GameCommander): Promise<number>;
    delete(idGame: number, idCommander: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class GameCommanderRepository implements IGameCommanderRepository {
    save(gameCommander: GameCommander): Promise<GameCommander> {
        throw new Error("Method not implemented.");
    }
    retrieveAll(searchParams: {idGame: number, idCommander: number}): Promise<GameCommander[]> {
        throw new Error("Method not implemented.");
    }
    retrieveByGameId(idGame: number): Promise<GameCommander | undefined> {
        throw new Error("Method not implemented.");
    }
    update(gameCommander: GameCommander): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(idGame: number, idCommander: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}