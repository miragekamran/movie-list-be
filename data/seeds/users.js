/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').insert([
    {username: "mirage", email: "miragekamran@gmail.com", password: "mirage135" },
    {username: "deewa", email: "dee@gmail.com", password: "deewa135"}
  ]);
};
