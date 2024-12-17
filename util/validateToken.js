import knex from "knex";
import knexConfig from "./../knexfile.js";
const db = knex(knexConfig);

export async function validateToken(token) {
  const session = await db("sessions").where("token", token).first();

  if (!session) {
    return null;
  }

  const user = await db("user").where("id", session.user_id).first();

  return user || null;
}
