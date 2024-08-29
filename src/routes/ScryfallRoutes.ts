import { Router } from "express";
import { initiateBulkCommandersUpdate } from "../services/ScryfallServices";

// Defines endpoints for Scryfall functions
class ScryfallRoutes {
    router = Router();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", initiateBulkCommandersUpdate);
    }
}

export default new ScryfallRoutes().router;