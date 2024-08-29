import connection from "../db";
import Deck from "../models/Deck.model";

interface IDeckRepository {
    save(deck: Deck): Promise<Deck>;
    retrieveAll(searchParams: {idDeck: number, userId: number, commanderId: number, partnerId: number, name: string}): Promise<Deck[]>;
    retrieveById(idDeck: number): Promise<Deck | undefined>;
    update(deck: Deck): Promise<number>;
    delete(idDeck: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class DeckPrintingRepository implements IDeckRepository {
    save(deck: Deck): Promise<Deck> {
        throw new Error("Method not implemented.");
    }
    retrieveAll(searchParams: {idDeck: number, userId: number, commanderId: number, partnerId: number, name: string}): Promise<Deck[]> {
        throw new Error("Method not implemented.");
    }
    retrieveById(idDeck: number): Promise<Deck | undefined> {
        throw new Error("Method not implemented.");
    }
    update(deck: Deck): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(idDeck: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

export default new DeckPrintingRepository();