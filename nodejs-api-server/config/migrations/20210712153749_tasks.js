exports.up = function (knex) {
  // use npm run migrate to run this table creation by knex.
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id");
    table.string("title").notNullable().unique();
    table.integer("number_of_sessions").notNullable();
    table.integer("total_time_elapsed").notNullable();
    table.boolean("is_done").default(false);
  });
};

exports.down = function (knex) {};
