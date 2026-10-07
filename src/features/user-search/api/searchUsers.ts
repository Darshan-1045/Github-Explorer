import { request, type RateLimitInfo } from '@/shared/api/client';
import { userSearchResponseSchema, type UserSearchResponse } from './schemas';

export async function searchUsers(
  query: string,
  signal?: AbortSignal,
): Promise<{
  data: UserSearchResponse;
  rateLimit: RateLimitInfo;
}> {
  const params = new URLSearchParams({
    q: query,
    per_page: '10',
    page: '1',
  });

  const response = await request<unknown>(
    `/search/users?${params.toString()}`,
    signal,
  );

  return {
    data: userSearchResponseSchema.parse(response.data),
    rateLimit: response.rateLimit,
  };
}
