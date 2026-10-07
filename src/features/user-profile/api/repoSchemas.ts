import { z } from 'zod';

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  html_url: z.string(),
  updated_at: z.string(),
});

export const repositoriesSchema = z.array(repositorySchema);

export type Repository = z.infer<typeof repositorySchema>;
