const knexCleaner = require("knex-cleaner");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    return knexCleaner.clean(knex, {
        ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    });
};
