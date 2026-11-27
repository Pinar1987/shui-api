import jwt from "jsonwebtoken";
import { response } from "../utils/response.js";

export const authMiddleware = ({ optional = false } = {}) => ({
  before: async (request) => {
    const header =
      request.event.headers?.authorization ??
      request.event.headers?.Authorization;

    if (header === undefined && optional) {
      request.event.user = null;
      return;
    }

    if (!header || !header.startsWith("Bearer ")) {
      return response(401, { error: "Unauthorized" });
    }

    try {
      const token = header.split(" ")[1];

      const user = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"],
      });

      if (typeof user.username !== "string" || !user.username) {
        return response(401, { error: "Invalid token" });
      }

      request.event.user = user;
    } catch {
      return response(401, { error: "Invalid token" });
    }
  },
});