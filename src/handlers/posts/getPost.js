import middy from "@middy/core";
import { findPost } from "../../services/postService.js";
import { response } from "../../utils/response.js";

const getPost = async (event) => {
  try {
    const post = await findPost(event.pathParameters.postId);

    if (!post) {
      return response(404, { error: "Post not found" });
    }

    return response(200, post);
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(getPost);