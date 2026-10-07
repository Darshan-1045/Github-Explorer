import { request } from '@/shared/api/client';
import { repositoriesSchema, type Repository } from './repoSchemas';

export async function getRepositories(
  username: string,
  signal?: AbortSignal,
): Promise<Repository[]> {
  const response = await request<unknown>(
    `/users/${encodeURIComponent(username)}/repos?per_page=30&sort=updated`,
    signal,
  );

  const result = repositoriesSchema.safeParse(response.data);

  if (!result.success) {
    throw result.error;
  }

  return result.data;
}
