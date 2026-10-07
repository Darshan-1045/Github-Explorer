import { useEffect, useState } from 'react';
import type { UserSearchItem } from '../api/schemas';

type UserListProps = {
  users: UserSearchItem[];
  onSelectUser: (username: string) => void;
};

export function UserList({ users, onSelectUser }: UserListProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const safeSelectedIndex = selectedIndex >= users.length ? -1 : selectedIndex;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (users.length === 0) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        setSelectedIndex((current) =>
          current < users.length - 1 ? current + 1 : 0,
        );
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        setSelectedIndex((current) =>
          current > 0 ? current - 1 : users.length - 1,
        );
      }

      if (event.key === 'Enter' && safeSelectedIndex >= 0) {
        onSelectUser(users[safeSelectedIndex].login);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [users, safeSelectedIndex, onSelectUser]);

  return (
    <ul className="user-list">
      {users.map((user, index) => (
        <li key={user.id}>
          <button
            className={`user-card ${
              index === safeSelectedIndex ? 'selected' : ''
            }`}
            onClick={() => onSelectUser(user.login)}
          >
            <img
              className="user-avatar"
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              width={48}
              height={48}
            />

            <span className="user-login">{user.login}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
