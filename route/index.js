import userAuthRoute from "./user-auth-route.js";
import userActionRoute from "./user-action-route.js";

export default async function (fastify, opts) {
  await fastify.register(userAuthRoute, { prefix: "/v1/auth" });
  await fastify.register(userActionRoute, { prefix: "/v1/" });
}
