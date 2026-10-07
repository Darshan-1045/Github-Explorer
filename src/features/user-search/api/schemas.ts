import { z } from 'zod';

export const userSearchItemSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
});

export const userSearchResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(userSearchItemSchema),
});

export type UserSearchItem = z.infer<typeof userSearchItemSchema>;

export type UserSearchResponse = z.infer<typeof userSearchResponseSchema>;
