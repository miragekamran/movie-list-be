// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./data/movies.db3",
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            },
        },
    },
    testing: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./data/movies.db3",
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            },
        },
    },
    production: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },
};
