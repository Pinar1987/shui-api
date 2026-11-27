import { randomUUID } from "node:crypto";
import { createPost } from "../repositories/postRepository.js";

export const createNewPost = async ({ title, content }, user) => {
  const now = new Date().toISOString();

  const post = {
    id: randomUUID(),
    username: user?.username ?? `guest${randomUUID().slice(0, 8)}`,
    isGuest: !user,
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };

  return createPost(post);
};