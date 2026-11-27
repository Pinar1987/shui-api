import { PutCommand } from "@aws-sdk/lib-dynamodb";
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