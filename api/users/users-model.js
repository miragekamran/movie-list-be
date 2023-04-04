const db = require("../../data/db-config");

module.exports = {
    add,
    find,
    findBy,
    findById,
};

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
