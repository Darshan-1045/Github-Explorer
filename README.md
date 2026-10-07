# GitHub Explorer

A React + TypeScript application for searching GitHub users and exploring their profiles, repositories, and programming language statistics.

## Features

- Search GitHub users
- 400ms debounced search
- Request cancellation with `AbortController`
- Runtime API validation with Zod
- User profile information
- Repository listing
- Sort repositories by:
  - Recently updated
  - Stars
  - Name
- Repository language statistics
- GitHub API rate-limit handling
- Retry failed requests
- Recent searches stored in `localStorage`
- URL state for search and selected user
- Keyboard shortcuts
- Responsive UI

## Tech Stack

- React
- TypeScript
- Vite
- Zod
- GitHub REST API
- ESLint
- Prettier
- pnpm

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the development server

```bash
pnpm dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Environment Variables

The application works without a GitHub token.

For a higher GitHub API rate limit, create a `.env` file in the project root:

```env
VITE_GITHUB_TOKEN=your_github_token
```

> Never commit your `.env` file or expose your GitHub token publicly.

## Available Scripts

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm format
pnpm format:check
pnpm build
pnpm preview
```

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Start development server         |
| `pnpm typecheck`    | Run TypeScript type checking     |
| `pnpm lint`         | Run ESLint                       |
| `pnpm format`       | Format the project with Prettier |
| `pnpm format:check` | Check Prettier formatting        |
| `pnpm build`        | Create production build          |
| `pnpm preview`      | Preview production build         |

## Keyboard Shortcuts

| Key     | Action                  |
| ------- | ----------------------- |
| `/`     | Focus search            |
| `Esc`   | Clear search            |
| `↑`     | Previous user           |
| `↓`     | Next user               |
| `Enter` | Select highlighted user |

## API

This project uses the GitHub REST API to:

- Search GitHub users
- Fetch user profiles
- Fetch user repositories
- Monitor API rate limits

API responses are validated at runtime using **Zod** before being used by the application.

## Project Structure

```text
src/
├── app/
│   └── App.tsx
├── features/
│   ├── user-search/
│   │   ├── api/
│   │   ├── components/
│   │   └── hooks/
│   └── user-profile/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       └── lib/
├── shared/
│   ├── api/
│   ├── hooks/
│   ├── ui/
│   └── lib/
├── index.css
└── main.tsx
```

## Quality Checks

Before deployment, verify that all checks pass:

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```

## License

This project is built for learning and portfolio purposes.
