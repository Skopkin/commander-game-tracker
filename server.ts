import express, { Application } from "express";
import Server from "./src/index";
import path from "path";
import { fileURLToPath } from 'url';

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((express.static(__dirname + '/public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/home.html'));
})

app
    .listen(PORT, "localhost", function () {
        console.log(`Server is running on port ${PORT}.`);
    })
    .on("error", (err: any) => {
        if (err.code === "EADDRINUSE"){
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });