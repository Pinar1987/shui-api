import { findPost } from "../services/postService.js";
import { response } from "../utils/response.js";

export const ownershipMiddleware = () => ({
  before: async (request) => {
    try {
      const post = await findPost(
        request.event.pathParameters.postId
      );

      if (!post) {
        return response(404, { error: "Post not found" });
      }

      if (post.isGuest || post.username !== request.event.user.username) {
        return response(403, { error: "Forbidden" });
      }

      request.event.post = post;
    } catch (error) {
      console.error(error);
      return response(500, { error: "Internal server error" });
    }
  },
});