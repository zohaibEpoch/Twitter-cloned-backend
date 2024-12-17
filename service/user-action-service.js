import knexConfig from "./../knexfile.js";
import knex from "knex";
//commit
const db = knex(knexConfig);

// Create a new Post
const createPost = async (userId, content) => {
  try {
    const [newPost] = await db("posts")
      .insert({
        user_id: userId,
        content,
      })
      .returning("*");
    return newPost;
  } catch (error) {
    console.error("Error creating Post:", error);
    throw new Error("Error creating Post");
  }
};

const followUsers = async (followerId, followeeId) => {
  try {
    const checkFollow = await db("follows")
      .where("follower_id", followerId)
      .andWhere("followee_id", followeeId)
      .first();

    if (checkFollow) {
      return "Already Following Each Other";
    }

    const [newFollow] = await db("follows")
      .insert({
        follower_id: followerId,
        followee_id: followeeId,
      })
      .returning("*");
    return newFollow;
  } catch (error) {
    console.error("Error follow User:", error);
    throw new Error("Error follow User");
  }
};

const likePost = async (userId, postId) => {
  try {
    const [newlike] = await db("likes")
      .insert({
        user_id: userId,
        post_id: postId,
      })
      .returning("*");
    return newlike;
  } catch (error) {
    console.error("Error in liking Post :", error);
    throw new Error("Error in liking Post ");
  }
};

const deletePost = async (userId, postId) => {
  try {
    const post = await db("posts").where("id", postId).first();
    if (!post) {
      return { error: "Post not Found" };
    }

    if (post.user_id != userId) {
      return { error: "Invalid UserId" };
    }

    await db("posts").where("id", postId).del();

    return "Post Deleted";
  } catch (error) {
    console.error("Error Deleting Post", error);
    throw new Error("Error Deleting Post");
  }
};

const getUserPreferencePostList = async (userId) => {
  try {
    const posts = await db("posts")
      .leftJoin("follows", "posts.user_id", "follows.followee_id")
      .where("follows.follower_id", userId)
      .select("posts.*");

    return posts;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

export {
  createPost,
  followUsers,
  deletePost,
  getUserPreferencePostList,
  likePost,
};
