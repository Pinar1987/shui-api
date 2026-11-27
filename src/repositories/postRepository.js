import { PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../utils/db.js";

const TableName = process.env.POSTS_TABLE;

export const createPost = async (post) => {
  await db.send(
    new PutCommand({
      TableName,
      Item: post,
      ConditionExpression: "attribute_not_exists(id)",
    })
  );

  return post;
};

export const getAllPosts = async () => {
  const posts = [];
  let lastKey;

  do {
    const result = await db.send(
      new ScanCommand({
        TableName,
        ExclusiveStartKey: lastKey,
      })
    );

    posts.push(...(result.Items ?? []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return posts;
};

export const getPostById = async (id) => {
  const result = await db.send(
    new GetCommand({
      TableName,
      Key: { id },
    })
  );

  return result.Item;
};