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


// const Movie = require("./movies-model");
// const router = require("express").Router();
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const fileFilter = function (req, file, cb) {
//     if (
//         file.mimetype === "image/jpeg" ||
//         file.mimetype === "image/png" ||
//         file.mimetype === "image/gif"
//     ) {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type"), false);
//     }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// router.get("/", (req, res) => {
//     Movie.getAll()
//         .then((movies) => {
//             res.json(movies);
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: `Failed to retrieve movies: ${err.message}`,
//             });
//         });
// });

// router.get("/:id", (req, res) => {
//     Movie.getById(req.params.id)
//         .then((movie) => {
//             if (movie) {
//                 res.json(movie);
//             } else {
//                 res.status(404).json({ message: "Failed to retrieve movie" });
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: `Failed to retrieve movie: ${err.message}`,
//             });
//         });
// });

// router.post("/", upload.single("image"), (req, res) => {
//     const movie = req.body;
//     const imageBuffer = req.file.buffer;
//     const image = imageBuffer.toString("base64");

//     Movie.create(movie, image)
//         .then((newMovieEntry) => {
//             res.status(201).json(newMovieEntry);
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: `Failed to create movie: ${err.message}`,
//             });
//         });
// });

// module.exports = router;
