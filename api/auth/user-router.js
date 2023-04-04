const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../auth/user-model");
const Movie = require("../auth/user-model");
require("dotenv").config();

const JWT_SECRET = "mysecretkey";

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({
            message: `Failed to register user: ${err.message}`,
        });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({
            message: `Failed to sign in user: ${err.message}`,
        });
    }
});

router.post("/signout", (req, res) => {
    res.status(200).json({ message: "User signed out successfully" });
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
