import {
  CreatePost,
  DeletePost,
  LikePost,
  FollowUsers,
  GetUserPreferencePostList,
} from "../service/user-action-service.js";

export default async function (fastify) {
  fastify.post("/create-post", async (req, reply) => {
    const { userId, content } = req.body;
    try {
      const newPost = await CreatePost(userId, content);
      return reply.status(201).send(newPost); // Return the created user
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  fastify.post("/delete-post", async (req, reply) => {
    const { userId, postId } = req.body;
    try {
      const deletedPost = await DeletePost(userId, postId);
      return reply.status(200).send(deletedPost);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  fastify.post("/follow-user", async (req, reply) => {
    const { followerId, followeeId } = req.body;
    try {
      const FollowUser = await FollowUsers(followerId, followeeId);

      return reply.status(200).send(FollowUser);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  fastify.post("/like-post", async (req, reply) => {
    const { userId, postId } = req.body;
    try {
      const likePost = await LikePost(userId, postId);

      return reply.status(200).send(likePost);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  fastify.post("/user-post", async (req, reply) => {
    const { userId } = req.body;
    try {
      const posts = await GetUserPreferencePostList(userId);
      return reply.status(200).send(posts);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
}
