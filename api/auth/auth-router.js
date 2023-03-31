const router = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./auth-model");

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

        // res.status(200).json({ message: `You are logged in ${user.username}`})
        res.status(200).json({ message: "You logged in successfuly!" });
    } catch (err) {
        next(err);
    }
});

// router.get("/logout", (req, res) => {
//     if (req.session) {
//         req.session.destroy((err) => {
//             if (err) {
//                 res.json({message: "Can't log out!"})
//             } else {
//                 res.json({message: "Logged out successfully!"})
//             }
//         })
//     }
// })

// router.get("/logout", async (req, res, next) => {
//     if (req.session.user) {
//         const { username } = req.session.user;
//         req.session.destroy((err) => {
//             if (err) {
//                 res.json({ message: `Can't log out ${username}` });
//             } else {
//                 res.set("");
//                 res.json({ message: `Goodbye ${username}` });
//             }
//         });
//     } else {
//         res.json({ message: "sorry, have we met?" });
//     }
// });

module.exports = router;
