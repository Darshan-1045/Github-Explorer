import { useEffect, useState } from 'react';
import { ApiError } from '@/shared/api/client';
import { searchUsers } from '../api/searchUsers';
import type { UserSearchItem } from '../api/schemas';
import { useDebounce } from '@/shared/hooks/useDebounce';

import type { RateLimitInfo } from '@/shared/api/client';

type SearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | {
      status: 'success';
      users: UserSearchItem[];
      rateLimit: RateLimitInfo;
    }
  | { status: 'error'; message: string };

export function useUserSearch(query: string) {
  const debouncedQuery = useDebounce(query, 400);

  const [state, setState] = useState<SearchState>({
    status: 'idle',
  });

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }

    const controller = new AbortController();

    async function runSearch() {
      setState({ status: 'loading' });

      try {
        const result = await searchUsers(debouncedQuery, controller.signal);

        setState({
          status: 'success',
          users: result.data.items,
          rateLimit: result.rateLimit,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        if (error instanceof ApiError) {
          if (error.status === 403 && error.rateLimit.remaining === 0) {
            const resetTime =
              error.rateLimit.reset !== null
                ? new Date(error.rateLimit.reset * 1000).toLocaleTimeString()
                : 'later';

            setState({
              status: 'error',
              message: `GitHub API rate limit reached. Please try again at ${resetTime}.`,
            });

            return;
          }

          setState({
            status: 'error',
            message: `GitHub request failed (${error.status}).`,
          });

          return;
        }

        setState({
          status: 'error',
          message: 'Something went wrong while searching GitHub.',
        });
      }
    }

    runSearch();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, retryCount]);

  if (!debouncedQuery.trim()) {
    return {
      state: { status: 'idle' } as const,
      retry: () => setRetryCount((count) => count + 1),
    };
  }

  return {
    state,
    retry: () => setRetryCount((count) => count + 1),
  };
}
