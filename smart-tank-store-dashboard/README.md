# Smart Tank Store Dashboard

A React + TypeScript + Vite application for managing individual stores in the Smart Tank ecosystem.

## Features

- **Store-specific login**: Separate dashboards for different stores
- **Demo accounts**: Two test store admins (admin1/admin2) with password "1234"
- **Store dashboard**: Overview of store information, stats, and quick actions
- **Responsive design**: Built with Material-UI components
- **Protected routes**: Authentication-based navigation

## Demo Accounts

- **admin1** / **1234** → Shop 1 Dashboard
- **admin2** / **1234** → Shop 2 Dashboard

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

## Project Structure

```
src/
├── components/
│   └── layout/
│       └── TopBar/
├── layout/
│   └── ProtectedLayout/
├── pages/
│   ├── Login/
│   └── Dashboard/
├── routes/
├── services/
├── types/
└── App.tsx
```

## Technology Stack

- **React** 19.1.0
- **TypeScript** 5.8.3
- **Vite** 6.3.5
- **Material-UI** 7.1.2
- **React Router** 7.6.2

## Build

```bash
npm run build
```

## Development

The application runs on port 3001 to avoid conflicts with other Smart Tank applications.
