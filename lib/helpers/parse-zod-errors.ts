import { ZodError } from "zod";

export const parseZodError = (error: ZodError): Record<string, string> => {
  const parsedErrors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const field = err.path[0];
    if (typeof field === "string") {
      parsedErrors[field] = err.message;
    }
  });

  return parsedErrors;
};
