import { response } from "../utils/response.js";

export const validationMiddleware = (schema, source = "body") => ({
  before: async (request) => {
    const result = schema.safeParse(request.event[source]);

    if (!result.success) {
      return response(400, {
        error: "Invalid request data",
      });
    }

    request.event[source] = result.data;
  },
});