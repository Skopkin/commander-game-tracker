import { Request, Response } from "express";
import CardPrinting from "../models/CardPrinting.model";
import CardPrintingRepository from "../repositories/ICardPrintingRepository"

export default class CardPrintingController {
    // Inserts a single card printing to db from a scryfall entry
    async create(req: Request, res: Response) {
        if (!req.body.scryId) {
            res.status(400).send({
                message: "Card Printing cannot be empty!"
            });
            return
        }

        try {
            const printing: CardPrinting = req.body;
            const savedPrinting = await CardPrintingRepository.save(printing);

            res.status(201).send(savedPrinting);
        } catch(err) {
            res.status(500).send({
                message: "Error occurred while retrieving card printing."
            });
        }
    }

    // Returns all printings of the same card
    async findAllByOID(req: Request, res: Response) {
        const oid: string = req.params.oid;

        try {
            const printings = await CardPrintingRepository.retrieveAllByOID(oid);

            res.status(200).send(printings);
        } catch (err) {
            res.status(500).send({
                message: "Error occurred while retrieving printings by oid."
            })
        }

    }

    // Finds a single printing
    async findOne(req: Request, res: Response) {
        const id: string = req.params.id;

        try {
            const printing = await CardPrintingRepository.retrieveById(id)

            if (printing) res.status(200).send(printing);
            else
                res.status(404).send({
                    message: `Cannot find Printing with id=${id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving Printing with id=${id}.`
            });
        }
    }

    // Deletes all from CardPrinting table
    async deleteAll(req: Request, res: Response) {
        try {
            const num = await CardPrintingRepository.deleteAll();

            res.send({ message: `${num} Card Printings were deleted successfully!`})
        } catch(err) {
            res.status(500).send({
                message: "Some error occurred while removing all Card Printings"
            });
        }
    }
}