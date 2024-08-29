import { Router } from "express";
import CommanderController from "../controllers/CommanderController";

// Defines endpoints for Commander functions
class CommanderRoutes {
    router = Router();
    controller = new CommanderController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", this.controller.create);

        this.router.get("/:id", this.controller.findOne);

        this.router.delete("/", this.controller.deleteAll);
    }
}

export default new CommanderRoutes().router;