import { z } from 'zod';

export const userProfileSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  public_repos: z.number(),
  created_at: z.string(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
