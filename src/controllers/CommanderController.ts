import { Request, Response } from "express";
import Commander from "../models/Commander.model";
import CommanderRepository from "../repositories/ICommanderRepository";

export default class CommanderController {
    async create(req: Request, res: Response) {
        if (!req.body.name) {
            res.status(400).send({
                message: "Commander can not be empty!"
            });
            return
        }

        try {
            const commander: Commander = req.body;
            const savedCommander = await CommanderRepository.save(commander);

            res.status(201).send(savedCommander);
        } catch(err) {
            res.status(500).send({
                message: "Error occurred while retrieving commander."
            });
        }
    }

    // Returns all commanders ordered by name
    async findAll(req: Request, res: Response) {
        
    }

    // Returns one or more commanders by name
    async findOne(req: Request, res: Response) {

    }

    // Deletes all from Commander table
    async deleteAll(req: Request, res: Response) {
        try {
            const num = await CommanderRepository.deleteAll();

            res.send({ message: `${num} Commanders were deleted successfully!` });
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while removing all Commanders"
            });
        }
    }
}