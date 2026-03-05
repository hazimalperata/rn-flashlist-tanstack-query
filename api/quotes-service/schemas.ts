import * as z from "zod";
import { createPaginationResponseSchema } from '@/api/schemas';

export const quoteSchema = z.object({
  id: z.number().nonnegative(),
  quote: z.string(),
  author: z.string(),
});

export const quotesResponseSchema = createPaginationResponseSchema(
  z.object({
    quotes: z.array(quoteSchema),
  })
);
