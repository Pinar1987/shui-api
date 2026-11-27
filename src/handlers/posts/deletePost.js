import middy from "@middy/core";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ownershipMiddleware } from "../../middlewares/ownershipMiddleware.js";
import { removePost } from "../../services/postService.js";
import { response } from "../../utils/response.js";

const deletePost = async (event) => {
  try {
    await removePost(
      event.pathParameters.postId,
      event.user.username
    );

    return { statusCode: 204 };
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(deletePost)
  .use(authMiddleware())
  .use(ownershipMiddleware());