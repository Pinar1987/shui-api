import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { authSchema } from "../../schemas/authSchema.js";
import { registerUser } from "../../services/authService.js";
import { response } from "../../utils/response.js";

const register = async (event) => {
  const validation = authSchema.safeParse(event.body);

  if (!validation.success) {
    return response(400, { error: "Invalid username or password" });
  }

  try {
    const username = await registerUser(validation.data);

    return response(201, {
      message: "User registered successfully",
      username,
    });
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return response(409, { error: "Username already exists" });
    }

    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(register).use(httpJsonBodyParser());