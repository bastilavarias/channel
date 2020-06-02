exports.up = function (knex) {
  return knex.schema.createTable("account", function (table) {
    table.integer("id").primary().notNullable();
    table.string("username").unique().notNullable();
    table.string("node_id").notNullable();
    table.string("name").notNullable();
    table.string("avatar_url").notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("account");
};
