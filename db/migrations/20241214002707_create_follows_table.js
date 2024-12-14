/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("follows", (table) => {
    table.uuid("follower_id").notNullable();
    table.uuid("followee_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .foreign("follower_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .foreign("followee_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("follows");
}
