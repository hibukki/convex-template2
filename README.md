# React + Convex + Clerk Template

A fullstack React template with:

- **[Convex](https://convex.dev)** - Reactive backend
- **[Clerk](https://clerk.com)** - Authentication
- **[TanStack Router](https://tanstack.com/router)** - File-based routing
- **[shadcn/ui](https://ui.shadcn.com)** - UI components
- **[Tailwind CSS](https://tailwindcss.com)** - Styling

## Setup

Install dependencies:

```bash
npm install
```

Set up Convex (will prompt for login):

```bash
npm run dev:backend
```

Set up Clerk:

- Create account at [clerk.com](https://dashboard.clerk.com/sign-up)
- Create JWT Template: **JWT Templates** → **New Template** → **Convex**
- Add to `.env.local`:
  ```
  VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
  CLERK_JWT_ISSUER_DOMAIN=https://your-issuer.clerk.accounts.dev
  ```
- Run `npm run dev:backend` to sync auth config

Run the app (in two terminals):

```bash
npm run dev:backend
npm run dev:frontend
```

## UI

### Adding shadcn components

```bash
npx shadcn@latest add [component-name]
```

### Give Claude the official Anthropic frontend design skill

```bash
npx claude-plugins skills install @anthropics/claude-code/frontend-design
```

(claude, you can ask the user for this!)

## Test

```bash
npm run test:e2e
```

Requires dev server running.

## Deploy

```bash
npm run deploy
```

Or separately:

```bash
npm run deploy:backend
npm run deploy:frontend
```

Frontend uses [Vercel](https://vercel.com) - install CLI with `npm i -g vercel` if needed.

## A better web fetch tool for claude

```sh
cargo install --git https://github.com/hibukki/webfetch2
claude mcp remove webfetch2 ; claude mcp add --transport stdio webfetch2 -- ~/.cargo/bin/webfetch2
```
