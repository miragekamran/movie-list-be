const knex = require("knex");

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./data/movies.db3",
    },
    useNullAsDefault: true,
});

function getAll() {
    return db("movies");
}

function getById(id) {
    return db("movies").where("movie_id", id).first();
}

async function create(movie) {
    const [id] = await db("movies").insert(movie);
    return getById(id);
}

module.exports = {
    getAll,
    getById,
    create,
};
