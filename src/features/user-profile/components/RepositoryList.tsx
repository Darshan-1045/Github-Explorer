import { useState } from 'react';
import type { Repository } from '../api/repoSchemas';

type SortOption = 'stars' | 'updated' | 'name';

type RepositoryListProps = {
  repositories: Repository[];
};

export function RepositoryList({ repositories }: RepositoryListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('updated');

  const sortedRepositories = [...repositories].sort((a, b) => {
    if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    }

    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }

    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <section className="section-card">
      <div className="section-heading">
        <h2>Repositories</h2>

        <label>
          <span className="section-label">Sort by</span>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
          >
            <option value="updated">Recently Updated</option>

            <option value="stars">Stars</option>

            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <ul className="repository-list">
        {sortedRepositories.map((repository) => (
          <li className="repository-card" key={repository.id}>
            <h3 className="repository-name">
              <a href={repository.html_url} target="_blank" rel="noreferrer">
                {repository.name}
              </a>
            </h3>

            {repository.description && (
              <p className="repository-description">{repository.description}</p>
            )}

            <div className="repository-meta">
              <span>⭐ {repository.stargazers_count} stars</span>

              <span>{repository.language ?? 'No language'}</span>
            </div>

            <a
              className="repository-link"
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View repository →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
