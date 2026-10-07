import { useEffect, useState } from 'react';
import { ApiError } from '@/shared/api/client';
import { getUser } from '../api/getUser';
import type { UserProfile } from '../api/schemas';

type ProfileState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; user: UserProfile }
  | { status: 'error'; message: string };

export function useUserProfile(username: string | null) {
  const [state, setState] = useState<ProfileState>({
    status: 'idle',
  });

  useEffect(() => {
    if (!username) {
      return;
    }

    const selectedUsername = username;
    const controller = new AbortController();

    async function loadProfile() {
      setState({ status: 'loading' });

      try {
        const user = await getUser(selectedUsername, controller.signal);

        setState({
          status: 'success',
          user,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('PROFILE ERROR:', error);

        if (error instanceof ApiError) {
          setState({
            status: 'error',
            message: `GitHub request failed (${error.status}).`,
          });

          return;
        }

        setState({
          status: 'error',
          message: 'Unable to load user profile.',
        });
      }
    }

    loadProfile();

    return () => {
      controller.abort();
    };
  }, [username]);

  return state;
}
