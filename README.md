# Next.js Journal

A journaling application built with Next.js, Prisma, and Supabase. This app allows users to create, edit, and manage journal entries with a clean and responsive UI.

## Key Features

- **User Authentication**: Secure login and signup powered by Supabase.
- **Journal Management**: Create, edit, and delete journal entries with ease.
- **Dark Mode**: A visually appealing dark mode for comfortable use at night.
- **Category Organization**: Categorize your entries for better organization.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

For a detailed overview of the system's architecture, workflows, and components, please refer to the **[System Design Document](./SYSTEM_DESIGN.md)**.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (for the database)
- [Supabase](https://supabase.com/) account (for authentication and database management)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-journal.git
cd nextjs-journal
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 3. Configure Supabase

1. Create a project on [Subabase](https://supabase.com/)
2. Go to **Settings > API** section in your Supabase dashboard and copy the `Project URL` and `Anon Key`.
3. Enable authentication by setting up providers (e.g, email/password) in the **Authentication** section.

### 4. Configure Environment Variables

Create a .env.local file in the root of the project and add the following environment variables:

```
DATABASE_URL=your_postgresql_database_url
DIRECT_URL=your_postgresql_direct_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholders with your actual credentials:

- `DATABASE_URL`:Your PostgreSQL connection using string (e.g `postgres://username:password@host:port/database`)
- `DIRECT URL`: Optional direct connection URL for Prisma.
- `NEXT_PUBLIC_SUPABASE_URL` : Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase `anon` key.

### 5. Set Up Prisma

1. Initialize Prisma:

```bash
npx prisma init
```

2. Update the `prisma/schema.prisma` file with your database schema. The project already includes a schema for `User`, `JournalEntry`, `Category`, and `Summary`.
3. Generate the Prisma client:

```bash
npx prisma generate
```

4. Apply the database migrations:

```bash
npx prisma migrate dev
```

### 6. Run the Development Server

Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:3000

---

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm prisma studio`: Open Prisma Studio to manage the database

---

## Technologies Used

- [Next.js Documentation](https://nextjs.org/docs): React framework for server-side rendering and static site generation
- [Prisma Documentation](https://www.prisma.io/docs): ORM for database management
- [Supabase Documentation](https://supabase.com/docs): Authentication and database management
- [Tailwind CSS Documentation](https://tailwindcss.com/docs): Utility-first CSS framework
- [Shadcn Documentation](https://ui.shadcn.com/docs): Pre-built UI components for Tailwind CSS
