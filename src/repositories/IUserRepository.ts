import connection from "../db";
import User from "../models/User.model";

interface IUserRepository {
    save(user: User): Promise<User>;
    retrieveAll(searchParams: {idUser: number, username: string}): Promise<User[]>;
    retrieveById(idUser: number): Promise<User | undefined>;
    update(user: User): Promise<number>;
    delete(idUser: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    retrieveAll(searchParams: {idUser: number, username: string}): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    retrieveById(idUser: number): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(idUser: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

export default new UserRepository();