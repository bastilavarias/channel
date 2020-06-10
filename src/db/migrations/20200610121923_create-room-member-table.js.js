exports.up = function (knex) {
  return knex.schema.createTable("room_member", function (table) {
    table.increments("id").primary().notNullable();
    table.integer("account_id").references("id").inTable("account");
    table.uuid("room_id").references("id").inTable("room");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("room_member");
};
