import * as z from "zod";
import { quoteSchema, quotesResponseSchema } from '@/api/quotes-service/schemas';

export type Quote = z.infer<typeof quoteSchema>;

export type QuotesResponse = z.infer<typeof quotesResponseSchema>;
