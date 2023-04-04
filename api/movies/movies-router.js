const Movie = require("./movies-model");
const router = require("express").Router();
const jwt = require("jsonwebtoken");


router.get("/", authenticateToken, (req, res) => {
    Movie.getAll()
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            res.status(500).json({
                message: `Failed to retrieve movies: ${err.message}`,
            });
        });
});

router.get("/:id", (req, res) => {
    Movie.getById(req.params.id)
        .then((movie) => {
            if (movie) {
                res.json(movie);
            } else {
                res.status(404).json({ message: "Failed to retrieve movie" });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `Failed to retrieve movie: ${err.message}`,
            });
        });
});

router.post("/", (req, res) => {
    Movie.create(req.body)
        .then((newMovieEntry) => {
            res.status(201).json(newMovieEntry);
        })
        .catch((err) => {
            res.status(500).json({
                message: `Failed to create movie: ${err.message}`,
            });
        });
});

router.put("/:id", (req, res) => {
    Movie.update(req.params.id, req.body)
        .then((updatedMovie) => {
            if (updatedMovie) {
                res.json(updatedMovie);
            } else {
                res.status(404).json({ message: "Failed to update movie" });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `Failed to update movie: ${err.message}`,
            });
        });
});

router.delete("/:id", (req, res) => {
    Movie.remove(req.params.id)
        .then((removedMovie) => {
            if (removedMovie) {
                res.json(removedMovie);
            } else {
                res.status(404).json({ message: "Failed to remove movie" });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `Failed to remove movie: ${err.message}`,
            });
        });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).json({ message: "Authentication failed" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Authentication failed" });
        }
        req.user = user;
        next();
    });
}

module.exports = router;