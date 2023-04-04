const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const welcomeRouter = require("./api/welcome/welcome-router")
// const authRouter = require("./api/users/users-router")
const moveisRouter = require("./api/movies/movies-router")

const server = express()

server.use(cors());
server.use(morgan("combined"))
server.use(helmet());
server.use(compression());
server.use(express.json());
server.use(bodyParser.json());
server.use(fileUpload());

server.use("/api", welcomeRouter);
// server.use("/api/auth", authRouter);
server.use("/api/movies", moveisRouter);

server.get("/", (req, res) => {
    res.status(200).json({
        message: "The API is running",
    });
});

module.exports = server