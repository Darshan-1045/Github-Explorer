import { useEffect, useRef, type ChangeEvent } from 'react';

type SearchInputProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
};

export function SearchInput({
  query,
  onQueryChange,
  onSearch,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === 'Escape') {
        onQueryChange('');
        inputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onQueryChange]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onQueryChange(event.target.value);
  }

  return (
    <div className="search-wrapper">
      <input
        ref={inputRef}
        className="search-input"
        type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch();
          }
        }}
        placeholder="Search GitHub users..."
        aria-label="Search GitHub users"
      />

      <button className="primary-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
