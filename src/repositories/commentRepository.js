import { PutCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../utils/db.js";

const TableName = process.env.COMMENTS_TABLE;

export const createComment = async (comment) => {
  await db.send(
    new PutCommand({
      TableName,
      Item: comment,
      ConditionExpression: "attribute_not_exists(id)",
    })
  );

  return comment;
};

export const getCommentsByPostId = async (postId) => {
  const comments = [];
  let lastKey;

  do {
    const result = await db.send(
      new QueryCommand({
        TableName,
        KeyConditionExpression: "postId = :postId",
        ExpressionAttributeValues: {
          ":postId": postId,
        },
        ExclusiveStartKey: lastKey,
      })
    );

    comments.push(...(result.Items ?? []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return comments;
};

export const deleteCommentsByPostId = async (postId) => {
  const comments = await getCommentsByPostId(postId);

  for (const comment of comments) {
    await db.send(
      new DeleteCommand({
        TableName,
        Key: { postId, id: comment.id },
      })
    );
  }
};