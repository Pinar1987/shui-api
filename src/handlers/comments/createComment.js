import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validationMiddleware } from "../../middlewares/validationMiddleware.js";
import { commentSchema } from "../../schemas/commentSchema.js";
import { createNewComment } from "../../services/commentService.js";
import { response } from "../../utils/response.js";

const createComment = async (event) => {
  try {
    const comment = await createNewComment(
      event.pathParameters.postId,
      event.body.content,
      event.user.username
    );

    if (!comment) {
      return response(404, { error: "Post not found" });
    }

    return response(201, {
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(createComment)
  .use(authMiddleware())
  .use(httpJsonBodyParser())
  .use(validationMiddleware(commentSchema));