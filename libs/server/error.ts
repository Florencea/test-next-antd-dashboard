import { ZodError } from "zod";

const ERROR_ENUM = {
  AUTH_USER_NOT_FOUND: "User not found.",
  AUTH_WRONG_PASSWORD: "Wrong password.",
  BAD_REQUEST: "Bad Request.",
  SERVER_ERROR: "Something went wrong",
};

export class ServerError extends Error {
  public code: keyof typeof ERROR_ENUM;
  constructor(code?: keyof typeof ERROR_ENUM, zodError?: ZodError) {
    super();
    this.name = "ServerError";
    this.code = code ?? "SERVER_ERROR";
    this.message = ERROR_ENUM[this.code];
    if (zodError) {
      this.code = "BAD_REQUEST";
      this.message = zodError.message;
    }
  }
}

export function handleError(error: unknown) {
  if (error instanceof ServerError) {
    return error;
  } else if (error instanceof ZodError) {
    return new ServerError("BAD_REQUEST", error);
  } else {
    return new ServerError("SERVER_ERROR");
  }
}
