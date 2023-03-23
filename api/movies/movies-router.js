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

// router.post("/", (req, res) => {
//     Movie.create(req.body)
//         .then((newMovieEntry) => {
//             res.status(201).json(newMovieEntry);
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: `Failed to create movie: ${err.message}`,
//             });
//         });
// });

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  const { title, director, metascore, genre, popular, description } = req.body;
  const imageBuffer = fs.readFileSync(req.file.path);
  const image = imageBuffer.toString('base64');

  try {
    const newMovie = await Movie.create({ title, director, metascore, genre, popular, description, image });
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: `Failed to create movie: ${err.message}` });
  } finally {
    fs.unlinkSync(req.file.path); // delete the temporary file
  }
});


module.exports = router;
