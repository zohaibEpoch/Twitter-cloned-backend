import { loginUser, signup } from "../service/user-auth-service.js";

export default async function (fastify) {
  // Signup User
  fastify.post("/signup", async (req, reply) => {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
      return reply
        .status(400)
        .send({ message: "Invalid input: 'username' is required" });
    }
    if (!password || typeof password !== "string") {
      return reply
        .status(400)
        .send({ message: "Invalid input: 'password' is required" });
    }

    try {
      const newUser = await signup(username, password);
      return reply.status(201).send(newUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Login User
  fastify.post("/login", async (req, reply) => {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
      return reply.status(400).send({
        message: "Invalid input: 'username' is required and must be a string.",
      });
    }
    if (!password || typeof password !== "string") {
      return reply.status(400).send({
        message: "Invalid input: 'password' is required and must be a string.",
      });
    }

    try {
      const loggedInUser = await loginUser(username, password);
      return reply.status(200).send(loggedInUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
}
