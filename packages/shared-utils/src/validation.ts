import { z, type ZodSchema } from 'zod';

export const customerIdSchema = z.string().uuid();
export const paginationSchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(25),
  offset: z.coerce.number().int().nonnegative().default(0)
});

export function validate<T>(schema: ZodSchema<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw new Error(`Validation failed: ${result.error.issues[0]?.message ?? 'unknown error'}`);
  return result.data;
}
