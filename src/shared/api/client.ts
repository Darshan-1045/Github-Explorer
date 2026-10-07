const GITHUB_API_BASE_URL = 'https://api.github.com';

export type RateLimitInfo = {
  remaining: number | null;
  reset: number | null;
};

export class ApiError extends Error {
  status: number;
  rateLimit: RateLimitInfo;

  constructor(
    message: string,
    status: number,
    rateLimit: RateLimitInfo = {
      remaining: null,
      reset: null,
    },
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.rateLimit = rateLimit;
  }
}

export type ApiResponse<T> = {
  data: T;
  rateLimit: RateLimitInfo;
};

export async function request<T>(
  path: string,
  signal?: AbortSignal,
): Promise<ApiResponse<T>> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers,
    signal,
  });

  const remainingHeader = response.headers.get('x-ratelimit-remaining');

  const resetHeader = response.headers.get('x-ratelimit-reset');

  const rateLimit: RateLimitInfo = {
    remaining: remainingHeader ? Number(remainingHeader) : null,
    reset: resetHeader ? Number(resetHeader) : null,
  };

  if (!response.ok) {
    throw new ApiError(
      `GitHub API request failed: ${response.status}`,
      response.status,
      rateLimit,
    );
  }

  return {
    data: await response.json(),
    rateLimit,
  };
}
