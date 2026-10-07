import { request } from '@/shared/api/client';
import { userProfileSchema, type UserProfile } from './schemas';

export async function getUser(
  username: string,
  signal?: AbortSignal,
): Promise<UserProfile> {
  const response = await request<unknown>(
    `/users/${encodeURIComponent(username)}`,
    signal,
  );

  const result = userProfileSchema.safeParse(response.data);

  if (!result.success) {
    throw result.error;
  }

  return result.data;
}
