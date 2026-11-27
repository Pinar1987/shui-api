import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../utils/db.js";

const TableName = process.env.USERS_TABLE;

export const getUser = async (username) => {
  const result = await db.send(
    new GetCommand({
      TableName,
      Key: { username },
    })
  );

  return result.Item;
};

export const createUser = async (user) => {
  await db.send(
    new PutCommand({
      TableName,
      Item: user,
      ConditionExpression: "attribute_not_exists(username)",
    })
  );

  return user;
};