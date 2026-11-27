import { response } from "../utils/response.js";

export const errorMiddleware = () => ({
  onError: async (request) => {
    const status = request.error.statusCode;

    if ([400, 415, 422].includes(status)) {
      request.response = response(400, {
        error: "Invalid request data",
      });
      return;
    }

    console.error(request.error);

    request.response = response(500, {
      error: "Internal server error",
    });
  },
});