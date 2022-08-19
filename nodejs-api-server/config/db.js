const { knex } = require("knex");
const knexfile = require("./knexfile");

// Export the knex instance as a module
const db = knex(knexfile.development);

module.exports = db;
