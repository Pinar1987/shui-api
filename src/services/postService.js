import { randomUUID } from "node:crypto";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../repositories/postRepository.js";

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

export const listPosts = async (username) => {
  const posts = await getAllPosts();

  const filtered = username
    ? posts.filter((post) => post.username === username)
    : posts;

  return filtered.sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt)
  );
};

export const findPost = async (id) => {
  return getPostById(id);
};

export const editPost = async (id, data, username) => {
  return updatePost(id, data, username);
};

export const removePost = async (id, username) => {
  return deletePost(id, username);
};