import middy from "@middy/core";
import { listPosts } from "../../services/postService.js";
import { response } from "../../utils/response.js";

const getPosts = async (event) => {
  const username = event.queryStringParameters?.username;

  if (username !== undefined && !username.trim()) {
    return response(400, { error: "Invalid username" });
  }

  try {
    const posts = await listPosts(username);
    return response(200, posts);
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(getPosts);