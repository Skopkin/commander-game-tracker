import express, { Application } from "express";
import Routes from "./routes";

// Defines main application and configurations
export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application) {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true}));
    }
}