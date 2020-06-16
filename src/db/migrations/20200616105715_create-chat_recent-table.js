exports.up = function (knex) {
  return knex.schema.createTable("chat_recent", function (table) {
    table.increments("id").primary().notNullable();
    table.boolean("is_read").defaultTo(false);
    table.integer("chat_id").references("id").inTable("chat");
    table.integer("account_id").references("id").inTable("account");
    table.uuid("room_id").references("id").inTable("room");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("chat_recent");
};
