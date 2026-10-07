import { useEffect, useState } from 'react';
import { ApiError } from '@/shared/api/client';
import { getRepositories } from '../api/getRepositories';
import type { Repository } from '../api/repoSchemas';

type RepositoryState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; repositories: Repository[] }
  | { status: 'error'; message: string };

export function useRepositories(username: string | null) {
  const [state, setState] = useState<RepositoryState>({
    status: 'idle',
  });

  useEffect(() => {
    if (!username) {
      return;
    }

    const selectedUsername = username;
    const controller = new AbortController();

    async function loadRepositories() {
      setState({ status: 'loading' });

      try {
        const repositories = await getRepositories(
          selectedUsername,
          controller.signal,
        );

        setState({
          status: 'success',
          repositories,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('REPOSITORIES ERROR:', error);

        if (error instanceof ApiError) {
          setState({
            status: 'error',
            message: `GitHub request failed (${error.status}).`,
          });

          return;
        }

        setState({
          status: 'error',
          message: 'Unable to load repositories.',
        });
      }
    }

    loadRepositories();

    return () => {
      controller.abort();
    };
  }, [username]);

  return state;
}
