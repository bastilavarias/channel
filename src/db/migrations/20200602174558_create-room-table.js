exports.up = function (knex) {
  return knex.schema.createTable("room", function (table) {
    table.uuid("id").primary().notNullable();
    table.string("name").notNullable();
    table.string("name_slug").notNullable();
    table.text("description");
    table.string("type").notNullable();
    table.string("password");
    table.string("avatar_url").notNullable();
    table.integer("account_id").references("id").inTable("account");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("room");
};
