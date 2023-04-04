const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../auth/user-model");
const Movie = require("../auth/user-model");
require("dotenv").config();

const JWT_SECRET = "mysecretkey";

router.get("/", (req, res) => {
    db.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).json({
                message: `Faild to retrieve users: ${err.message}`,
            });
        });
});

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Failed to retrieve user" });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `Faild to retrieve movie: ${err.message}`,
            });
        });
});

router.post("/register", async (req, res, next) => {
    try {
        const { username, email } = req.body;

        const user = await db.findBy({ username, email }).first();
        if (user) {
            return res.status(409).json({ message: "User is already taken!" });
        } else {
            const passHashing = bcrypt.hashSync(req.body.password, 16);
            res.status(201).json(
                await db.add({ ...req.body, password: passHashing })
            );
        }
        console.log("User created:", req.body.username);
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    const authError = { message: "Invalid credentials!" };
    try {
        const user = await db.findBy({ username: req.body.username }).first();
        if (!user) {
            return res.status(401).json(authError);
        }

        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        console.log("User logged in:", req.body.username);

        if (!passwordValid) {
            return res.status(401).json(authError);
        }

        const tokenPayload = {
            userId: user.id,
        };

        res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET));

        // Sign token and send it to client
        // const token = signToken(user._id);
        // res.json({ token });

        // res.status(200).json({ message: `You are logged in ${user.username}`})
        res.status(200).json({ message: "You logged in successfuly!" });
    } catch (err) {
        next(err);
    }
});

router.post("/logout", (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
});

router.get("/movies", authenticateToken, async (req, res) => {
    try {
        const movies = await Movie.getAll();
        res.json(movies);
    } catch (err) {
        res.status(500).json({
            message: `Failed to retrieve movies: ${err.message}`,
        });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).json({ message: "Authentication failed" });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Authentication failed" });
        }
        req.user = user;
        next();
    });
}

module.exports = router;
