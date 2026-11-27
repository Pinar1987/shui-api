import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ownershipMiddleware } from "../../middlewares/ownershipMiddleware.js";
import { validationMiddleware } from "../../middlewares/validationMiddleware.js";
import { postSchema } from "../../schemas/postSchema.js";
import { editPost } from "../../services/postService.js";
import { response } from "../../utils/response.js";

const updatePost = async (event) => {
  try {
    const post = await editPost(
      event.pathParameters.postId,
      event.body,
      event.user.username
    );

    return response(200, {
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(updatePost)
  .use(authMiddleware())
  .use(httpJsonBodyParser())
  .use(validationMiddleware(postSchema))
  .use(ownershipMiddleware());