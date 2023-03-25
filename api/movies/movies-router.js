const Movie = require("./movies-model");
const router = require("express").Router();


router.get("/", (req, res) => {
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

module.exports = router;