export function UserListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 5 }, (_, index) => (
        <li key={index}>
          <div
            style={{
              width: 48,
              height: 48,
              background: '#ddd',
              borderRadius: '50%',
            }}
          />

          <div
            style={{
              width: 120,
              height: 16,
              background: '#ddd',
            }}
          />
        </li>
      ))}
    </ul>
  );
}
