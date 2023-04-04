/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable("movies", (table) => {
        table.increments("movie_id");
        table.string("title", 100).notNullable().unique();
        table.string("director", 100).notNullable();
        table.decimal("metascore").notNullable();
        table.string("genre", 100);
        table.boolean("popular");
        table.string("description").notNullable;
        table.binary("image").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("movies");
};