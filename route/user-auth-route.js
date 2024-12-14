import { LoginUser, Logout, Signup } from "../service/user-auth-service.js";

export default async function (fastify) {
  // Sign In function
  fastify.post("/signup", async (req, reply) => {
    const { username, password } = req.body;
    try {
      const newUser = await Signup(username, password);
      return reply.status(201).send(newUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Login User
  fastify.post("/login", async (req, reply) => {
    const { username, password } = req.body;
    try {
      const loginUser = await LoginUser(username, password);
      return reply.status(200).send(loginUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
  // Logout User
  fastify.post("/logout", async (req, reply) => {
    const { userId } = req.body;
    try {
      const logoutUser = await Logout(userId);

      return reply.status(200).send(logoutUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
}
