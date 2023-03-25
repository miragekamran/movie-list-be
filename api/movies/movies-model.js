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

async function update(id, movie) {
    await db("movies").where("movie_id", id).update(movie);
    return getById(id);
}

async function remove(id) {
    const movie = await getById(id);
    await db("movies").where("movie_id", id).delete();
    return movie;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
