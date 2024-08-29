import { Router } from "express";
import CardPrintingController from "../controllers/CardPrintingController";

// Defines endpoints for Card Printing functions
class CardPrintingRoutes {
    router = Router();
    controller = new CardPrintingController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", this.controller.create);

        this.router.get("/oracle/:oid", this.controller.findAllByOID);

        this.router.get("/:id", this.controller.findOne);

        this.router.delete("/", this.controller.deleteAll);
    }
}

export default new CardPrintingRoutes().router;