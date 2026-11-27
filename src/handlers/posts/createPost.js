import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validationMiddleware } from "../../middlewares/validationMiddleware.js";
import { postSchema } from "../../schemas/postSchema.js";
import { createNewPost } from "../../services/postService.js";
import { response } from "../../utils/response.js";
import { errorMiddleware } from "../../middlewares/errorMiddleware.js";

const createPost = async (event) => {
  try {
    const post = await createNewPost(event.body, event.user);

    return response(201, {
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(createPost)
  .use(authMiddleware({ optional: true }))
  .use(httpJsonBodyParser())
  .use(validationMiddleware(postSchema))
  .use(errorMiddleware());