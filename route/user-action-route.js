import {
  createPost,
  deletePost,
  likePost,
  followUsers,
  getUserPreferencePostList,
} from "../service/user-action-service.js";

import { logout } from "../service/user-auth-service.js";
import { validateToken } from "../util/validateToken.js";

export default async function (fastify) {
  fastify.addHook("preHandler", async (req, reply) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const user = await validateToken(token);
      if (!user) {
        return reply
          .status(401)
          .send({ message: "Unauthorized: Invalid token" });
      }
      req.user = user;
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Create a new post
  fastify.post("/posts", async (req, reply) => {
    const { content } = req.body;
    const { id: userId } = req.user;

    if (!content || typeof content !== "string" || content.length > 280) {
      return reply.status(400).send({
        message:
          "Invalid input: 'content' is required and must be a string with a maximum of 280 characters.",
      });
    }

    try {
      const newPost = await createPost(userId, content);
      return reply.status(201).send(newPost);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Delete a post
  fastify.delete("/posts/:postId", async (req, reply) => {
    const { id: userId } = req.user;
    const { postId } = req.params;

    if (!postId || typeof postId !== "string") {
      return reply.status(400).send({
        message:
          "Invalid input: 'postId' is required and must be a valid string.",
      });
    }

    try {
      const deletedPost = await deletePost(userId, postId);
      return reply.status(200).send(deletedPost);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Follow a user
  fastify.post("/follow/:followeeId", async (req, reply) => {
    const { id: followerId } = req.user;
    const { followeeId } = req.params;

    if (!followeeId || typeof followeeId !== "string") {
      return reply.status(400).send({
        message:
          "Invalid input: 'followeeId' is required and must be a valid string.",
      });
    }

    try {
      const followUser = await followUsers(followerId, followeeId);
      return reply.status(200).send(followUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Like a post
  fastify.post("/posts/:postId/like", async (req, reply) => {
    const { id: userId } = req.user;
    const { postId } = req.params;

    if (!postId || typeof postId !== "string") {
      return reply.status(400).send({
        message:
          "Invalid input: 'postId' is required and must be a valid string.",
      });
    }

    try {
      const likedPost = await likePost(userId, postId);
      return reply.status(200).send(likedPost);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Get user-preference-based posts
  fastify.get("/users/:userId/posts", async (req, reply) => {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return reply.status(400).send({
        message:
          "Invalid input: 'userId' is required and must be a valid string.",
      });
    }

    try {
      const posts = await getUserPreferencePostList(userId);
      return reply.status(200).send(posts);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Logout User
  fastify.post("/logout", async (req, reply) => {
    const { id: userId } = req.user;

    if (!userId || typeof userId !== "string") {
      return reply.status(400).send({
        message:
          "Invalid input: 'userId' is required and must be a valid string.",
      });
    }

    try {
      const loggedOutUser = await logout(userId);
      return reply.status(200).send(loggedOutUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
}
