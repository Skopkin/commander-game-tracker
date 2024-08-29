import { Application } from "express";
import CardPrintingRoutes from "./CardPrintingRoutes";
import CommanderRoutes from "./CommanderRoutes";
import ScryfallRoutes from "./ScryfallRoutes";

// Defines root endpoints
export default class Routes {
    constructor(app: Application) {
        app.use("/api/cardPrinting", CardPrintingRoutes);
        app.use("/api/commander", CommanderRoutes);
        app.use("/api/sf", ScryfallRoutes);
    }
}