import type { RateLimitInfo } from '@/shared/api/client';

type RateLimitBannerProps = {
  rateLimit: RateLimitInfo;
};

export function RateLimitBanner({ rateLimit }: RateLimitBannerProps) {
  if (rateLimit.remaining === null || rateLimit.remaining >= 10) {
    return null;
  }

  const resetTime =
    rateLimit.reset !== null
      ? new Date(rateLimit.reset * 1000).toLocaleTimeString()
      : 'soon';

  return (
    <p>
      Only {rateLimit.remaining} GitHub API requests remaining. Rate limit
      resets at {resetTime}.
    </p>
  );
}
