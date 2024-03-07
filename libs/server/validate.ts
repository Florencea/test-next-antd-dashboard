"use server";

import type { ZodSchema } from "zod";

export async function validate<T>(schema: ZodSchema<T>, formData: FormData) {
  return await schema.parseAsync(Object.fromEntries(formData.entries()));
}
