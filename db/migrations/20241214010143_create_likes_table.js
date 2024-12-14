/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("likes", (table) => {
    table.uuid("user_id").notNullable();
    table.uuid("post_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .foreign("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("likes");
}
