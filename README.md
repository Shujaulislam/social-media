This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
src/
├── app/                    # Next.js app directory (pages and routes)
├── components/            # Reusable UI components
├── lib/                   # Core functionality and utilities
│   ├── context/          # React context providers
│   │   └── authContext/  # Authentication context and logic
│   ├── firebase/         # Firebase configuration and setup
│   └── profile/          # User profile related functionality
└── middleware.ts         # Next.js middleware for route protection

```

### Directory Overview

- `src/app/`: Contains the main application pages and API routes following Next.js 13+ app directory structure.
- `src/components/`: Houses all reusable UI components, making the codebase modular and maintainable.
- `src/lib/`: Core application logic and utilities:
  - `context/`: React context providers for state management
  - `firebase/`: Firebase configuration and initialization
  - `profile/`: User profile management and related functions
- `src/middleware.ts`: Handles route protection and authentication checks

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
