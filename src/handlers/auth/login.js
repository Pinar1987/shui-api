import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { authSchema } from "../../schemas/authSchema.js";
import { loginUser } from "../../services/authService.js";
import { response } from "../../utils/response.js";
import { errorMiddleware } from "../../middlewares/errorMiddleware.js";
const login = async (event) => {
  const validation = authSchema.safeParse(event.body);

  if (!validation.success) {
    return response(400, { error: "Invalid username or password" });
  }

  try {
    const { username, password } = validation.data;
    const token = await loginUser({ username, password });

    if (!token) {
      return response(401, { error: "Invalid credentials" });
    }

    return response(200, {
      message: "Login successful",
      token,
      username,
    });
  } catch (error) {
    console.error(error);
    return response(500, { error: "Internal server error" });
  }
};

export const handler = middy(login)
  .use(httpJsonBodyParser())
  .use(errorMiddleware());