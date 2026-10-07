import { useEffect, useState } from 'react';

const STORAGE_KEY = 'github-recent-searches';
const MAX_SEARCHES = 5;

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(stored);

      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  }, [searches]);

  function addSearch(query: string) {
    const value = query.trim();

    if (!value) {
      return;
    }

    setSearches((current) =>
      [
        value,
        ...current.filter(
          (search) => search.toLowerCase() !== value.toLowerCase(),
        ),
      ].slice(0, MAX_SEARCHES),
    );
  }

  return {
    searches,
    addSearch,
  };
}
