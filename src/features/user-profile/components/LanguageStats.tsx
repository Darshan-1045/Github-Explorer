import type { Repository } from '../api/repoSchemas';

type LanguageStatsProps = {
  repositories: Repository[];
};

export function LanguageStats({ repositories }: LanguageStatsProps) {
  const languageCounts = repositories.reduce<Record<string, number>>(
    (counts, repository) => {
      if (repository.language) {
        counts[repository.language] = (counts[repository.language] ?? 0) + 1;
      }

      return counts;
    },
    {},
  );

  const languages = Object.entries(languageCounts).sort(
    ([, countA], [, countB]) => countB - countA,
  );

  const maxCount = languages[0]?.[1] ?? 0;

  return (
    <section className="section-card">
      <div className="section-heading">
        <h2>Languages</h2>
      </div>

      {languages.length === 0 ? (
        <p className="profile-login">No language data available.</p>
      ) : (
        <ul className="language-list">
          {languages.map(([language, count]) => {
            const width = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <li key={language}>
                <div className="language-header">
                  <span>{language}</span>
                  <span>{count} repositories</span>
                </div>

                <div className="language-bar">
                  <div
                    className="language-bar-fill"
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
