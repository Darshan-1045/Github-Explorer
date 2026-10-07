import { useEffect, useState } from 'react';
import { SearchInput } from '@/features/user-search/components/SearchInput';
import { UserList } from '@/features/user-search/components/UserList';
import { UserListSkeleton } from '@/features/user-search/components/UserListSkeleton';
import { useUserSearch } from '@/features/user-search/hooks/useUserSearch';
import { UserProfile } from '@/features/user-profile/components/UserProfile';
import { useUserProfile } from '@/features/user-profile/hooks/useUserProfile';
import { RepositoryList } from '@/features/user-profile/components/RepositoryList';
import { useRepositories } from '@/features/user-profile/hooks/useRepositories';
import { LanguageStats } from '@/features/user-profile/components/LanguageStats';
import { RateLimitBanner } from '@/features/user-search/components/RateLimitBanner';
import { useRecentSearches } from '@/features/user-search/hooks/useRecentSearches';

function App() {
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return params.get('q') ?? '';
  });

  const [selectedUsername, setSelectedUsername] = useState<string | null>(
    () => {
      const params = new URLSearchParams(window.location.search);

      return params.get('user');
    },
  );

  const { state, retry } = useUserSearch(query);
  const profileState = useUserProfile(selectedUsername);
  const repositoryState = useRepositories(selectedUsername);
  const { searches, addSearch } = useRecentSearches();

  useEffect(() => {
    const params = new URLSearchParams();

    if (query) {
      params.set('q', query);
    }

    if (selectedUsername) {
      params.set('user', selectedUsername);
    }

    const queryString = params.toString();

    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [query, selectedUsername]);

  function handleSearch() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setQuery(trimmedQuery);
    addSearch(trimmedQuery);
  }

  function handleRecentSearch(search: string) {
    setQuery(search);
    addSearch(search);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>GitHub Explorer</h1>
        <p>Search GitHub users and explore their repositories.</p>
      </header>

      <SearchInput
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

      {searches.length > 0 && (
        <section className="recent-searches">
          <p className="section-label">Recent Searches</p>

          <ul className="recent-list">
            {searches.map((search) => (
              <li key={search}>
                <button
                  className="recent-button"
                  onClick={() => handleRecentSearch(search)}
                >
                  {search}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {state.status === 'loading' && <UserListSkeleton />}

      {state.status === 'error' && (
        <div>
          <p>{state.message}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {state.status === 'success' && (
        <>
          <RateLimitBanner rateLimit={state.rateLimit} />

          {state.users.length === 0 && <p>No users for '{query}'</p>}

          {state.users.length > 0 && (
            <UserList users={state.users} onSelectUser={setSelectedUsername} />
          )}
        </>
      )}

      {profileState.status === 'loading' && <p>Loading profile...</p>}

      {profileState.status === 'error' && <p>{profileState.message}</p>}

      {profileState.status === 'success' && (
        <UserProfile user={profileState.user} />
      )}

      {repositoryState.status === 'loading' && <p>Loading repositories...</p>}

      {repositoryState.status === 'error' && <p>{repositoryState.message}</p>}

      {repositoryState.status === 'success' && (
        <>
          <RepositoryList repositories={repositoryState.repositories} />

          <LanguageStats repositories={repositoryState.repositories} />
        </>
      )}
    </main>
  );
}

export default App;
