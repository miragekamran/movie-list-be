const knex = require("knex");

const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./data/users.db3",
    },
    useNullAsDefault: true,
});

function find() {
    return db("users").select("id", "username", "email", "password");
}

function findBy(filter) {
    return db("users").where(filter);
}

async function add(user) {
    const [id] = await db("users").insert(user, "id").returning("id");

    return findById(id);
}

function findById(id) {
    return db("users").where({ id }).first();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
};
