import { randomUUID } from "node:crypto";
import { findPost } from "./postService.js";
import {
  createComment,
  getCommentsByPostId,
} from "../repositories/commentRepository.js";

export const createNewComment = async (postId, content, username) => {
  const post = await findPost(postId);

  if (!post) return null;

  const comment = {
    id: randomUUID(),
    postId,
    username,
    content,
    createdAt: new Date().toISOString(),
  };

  return createComment(comment);
};

export const listComments = async (postId) => {
  const post = await findPost(postId);

  if (!post) return null;

  const comments = await getCommentsByPostId(postId);

  return comments.sort(
    (a, b) => a.createdAt.localeCompare(b.createdAt)
  );
};