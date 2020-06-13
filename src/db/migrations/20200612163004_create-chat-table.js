exports.up = function (knex) {
  return knex.schema.createTable("chat", function (table) {
    table.increments("id").primary().notNullable();
    table.string("message").notNullable();
    table.string("type").notNullable();
    table.integer("account_id").references("id").inTable("account");
    table.uuid("room_id").references("id").inTable("room");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("chat");
};
