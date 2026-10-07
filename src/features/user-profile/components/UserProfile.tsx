import type { UserProfile as UserProfileData } from '../api/schemas';
import { formatDate } from '../lib/formatDate';

type UserProfileProps = {
  user: UserProfileData;
};

export function UserProfile({ user }: UserProfileProps) {
  return (
    <section className="profile-card">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={120}
          height={120}
        />

        <div>
          <h2 className="profile-name">{user.name ?? user.login}</h2>

          <p className="profile-login">@{user.login}</p>
        </div>
      </div>

      {user.bio && <p className="profile-bio">{user.bio}</p>}

      <div className="profile-stats">
        <div className="profile-stat">
          <strong>{user.followers}</strong>
          <span>Followers</span>
        </div>

        <div className="profile-stat">
          <strong>{user.following}</strong>
          <span>Following</span>
        </div>

        <div className="profile-stat">
          <strong>{user.public_repos}</strong>
          <span>Repositories</span>
        </div>
      </div>

      <p className="profile-login">Joined {formatDate(user.created_at)}</p>

      <a
        className="github-link"
        href={`https://github.com/${user.login}`}
        target="_blank"
        rel="noreferrer"
      >
        View GitHub Profile →
      </a>
    </section>
  );
}
