const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const welcomeRouter = require("./api/welcome/welcome-router")
const moveisRouter = require("./api/movies/movies-router")

const server = express()

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(bodyParser.json());
server.use(fileUpload());

server.use("/api", welcomeRouter);
server.use("/api/movies", moveisRouter)

server.get("/", (req, res) => {
    res.status(200).json({
        message: "The API is running",
    });
});

module.exports = server