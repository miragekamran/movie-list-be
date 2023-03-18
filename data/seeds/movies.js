/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("movies").truncate();
    await knex("movies").insert([
        {
            title: "The Godfather",
            director: "Francis Ford Coppola",
            metascore: 100,
            genre: "Drama",
            popular: true,
            description:
                "War hero Michael is the prodigal son of aging but fearsome crime patriarch Don Vito Corleone. When Michael returns home only to be thrust into an all-too-familiar world of hitmen, corrupt cops, and simmering mafia rivalries, he is forced to choose between his own path and the Corleone family legacy.",
        },
        {
            title: "Dumb and Dumber",
            director: "The Farely Brothers",
            metascore: 76,
            genre: "Comedy",
            popular: 0,
            description:
                "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
        },
        {
            title: "Terminator 2: Judgement Day",
            director: "James Cameron",
            metascore: 94,
            genre: "Action",
            popular: null,
            description:
                "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son, John Connor, from a more advanced and powerful cyborg.",
        },
    ]);
};
