import generateRandomString from "../util/randomString.js";
import knexConfig from "./../knexfile.js"; // Import your knex configuration
import knex from "knex";

const db = knex(knexConfig);

// Create a new user
const Signup = async (username, password) => {
  try {
    const [user] = await db("user").where("username", username);
    if (user) {
      return { error: "Username Already Exist" };
    }

    const [newUser] = await db("user")
      .insert({
        username,
        password,
      })
      .returning("*");
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

const Logout = async (userId) => {
  try {
    const rowsAffected = await db("sessions").where("user_id", userId).del();
    if (rowsAffected > 0) {
      return "User Logged Out";
    } else {
      return "User is not Logged In";
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

// Login a user
const LoginUser = async (username, password) => {
  try {
    const [user] = await db("user").where("username", username);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password !== password) {
      return { error: "Password Incorrect" };
    }

    const [sessionUser] = await db("sessions").where("user_id", user.id);
    if (sessionUser) {
      return { error: "User already Logged In" };
    }

    const token = generateRandomString();

    await db("sessions").insert({
      user_id: user.id,
      token: token,
    });

    return token;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: error.messasge };
  }
};

export { Signup, LoginUser, Logout };
