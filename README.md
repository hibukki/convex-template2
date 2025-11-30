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

## Adding shadcn components

```bash
npx shadcn@latest add [component-name]
```

## Deploy

```bash
npm run build
npx convex deploy
```
