import connection from "../db";
import Game from "../models/Game.model";

interface IGameRepository {
    save(game: Game): Promise<Game>;
    retrieveAll(searchParams: {idGame: number, deckId: number, game_length: number, player2: string, player3: string, player4: string, first_player: string, first_player_win: boolean, fast_mana_present: boolean, fast_mana_win: boolean, date: Date, winner: string }): Promise<Game[]>;
    retrieveById(idGame: number): Promise<Game | undefined>;
    update(game: Game): Promise<number>;
    delete(idGame: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class GameRepository implements IGameRepository {
    save(game: Game): Promise<Game> {
        throw new Error("Method not implemented.");
    }
    retrieveAll(searchParams: {idGame: number, deckId: number, game_length: number, player2: string, player3: string, player4: string, first_player: string, first_player_win: boolean, fast_mana_present: boolean, fast_mana_win: boolean, date: Date, winner: string }): Promise<Game[]> {
        throw new Error("Method not implemented.");
    }
    retrieveById(idGame: number): Promise<Game | undefined> {
        throw new Error("Method not implemented.");
    }
    update(game: Game): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(idGame: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

export default new GameRepository();