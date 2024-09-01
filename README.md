# Welcome to CheckCheckPWA

**CheckCheckPWA** is a Progressive Web Application (PWA) for managing your tasks and uses React, Vite, Supabase and TailwindCSS. This Project was developed for a Bachelorthesis.

## Table of Contents

-   [Installation](#installation)
-   [Running the Project](#run-project)
-   [Project Structure](#project-structure)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Raja1107/CheckCheckPWA.git
    cd CheckCheckPWA
    ```

2. **Install dependencies:**
   Make sure you have Node.js and pnpm installed. Then run:

    ```sh
    pnpm install
    ```

3. **Set up Environment Variable:**

    Create a `.env` file in the root of your project and add your Supabase key:

    ```sh
    VITE_SUPABASE_KEY = "your_supabase_key"
    ```

## Run Project:

To start the development server, run:

```sh
pnpm dev
```

## Project Structure:

```
CheckCheckPWA/
├── dev-dist/                # Development distribution files
│   ├── sw.js                # Service worker
│   └── workbox-dcc48fc1.js  # Workbox configuration
├── public/                  # Static assets
│   ├── manifest.json        # Web app manifest
│   └── site.webmanifest     # Site web manifest
├── src/                     # Source files
│   ├── components/          # React components
│   │   ├── Form.tsx         # Form component
│   │   ├── Supabase.ts      # Supabase utility
│   │   ├── Todo.tsx         # Todo component
│   │   └── ToDoList.tsx     # ToDoList component
│   ├── App.tsx              # Main App component
│   ├── index.css            # Global CSS
│   ├── main.tsx             # Entry point
│   └── types.ts             # TypeScript types
├── .env                     # Environment variables
├── .eslintrc.cjs            # ESLint configuration
├── .gitignore               # Git ignore file
├── .prettierrc              # Prettier configuration
├── index.html               # HTML template
├── package.json             # Project metadata and dependencies
├── pnpm-lock.yaml           # Lockfile for pnpm
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TypeScript configuration for Node.js
├── vite-env.d.ts            # Vite environment types
└── vite.config.ts           # Vite configuration
```
