# Job Tracker

Job Tracker is a personal application tracking dashboard for keeping your job search organized. Record the positions you have applied for and follow each application as it moves through your hiring process.

## Features

- Sign up and sign in with email and password.
- Organize applications on a Kanban board with **Applied**, **Interview**, **Offer**, and **Rejected** columns.
- Add, edit, move, and delete job applications.
- Store details such as company, position, location, salary, application date, job link, notes, and tags.
- Keep application data associated with the signed-in user.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and TypeScript
- [MongoDB](https://www.mongodb.com/), using Mongoose for application data
- [Better Auth](https://www.better-auth.com/) for email and password authentication, backed by MongoDB
- [Vitest](https://vitest.dev/) for testing
- [Tailwind CSS](https://tailwindcss.com/) for styling and [shadcn/ui](https://ui.shadcn.com/) for UI components

## Getting started

### Requirements

- Node.js
- A MongoDB database and connection URI

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and set the required environment variables:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/job-tracker
   BETTER_AUTH_SECRET=replace-with-a-long-random-secret
   BETTER_AUTH_URL=http://localhost:3000
   ```

   Use your own MongoDB URI and a secure, randomly generated secret. `BETTER_AUTH_URL` should match the base URL where the app is running.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser and create an account.

The dashboard creates a default **Job Hunt** board and its workflow columns when a signed-in user first accesses it.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx vitest run` | Run the test suite |

## Project structure

```text
app/                  Next.js routes and layouts
components/           Shared UI and dashboard components
lib/actions/          Server actions for boards and applications
lib/better-auth/      Better Auth configuration
lib/mongo/            MongoDB connection and Mongoose models
__tests__/             Vitest tests
```
