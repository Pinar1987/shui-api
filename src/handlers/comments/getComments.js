import middy from "@middy/core";
import { listComments } from "../../services/commentService.js";
import { response } from "../../utils/response.js";

const getComments = async (event) => {
  try {
    const comments = await listComments(
      event.pathParameters.postId
    );

    if (!comments) {
      return response(404, { error: "Post not found" });
    }

    return response(200, comments);
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(getComments);