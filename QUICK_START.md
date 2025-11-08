# Quick Start Guide

## Installation

```bash
cd "creaverse web app"
npm install
```

## Development

```bash
npm run dev
```

The app will start at `http://localhost:3000`

## Environment Setup

1. Copy `.env.example` to `.env`
2. Set `VITE_API_URL` to your backend API URL (default: `http://localhost:4000/api`)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Features

- ✅ Modern React 19 with TypeScript
- ✅ Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ TanStack Query for data fetching
- ✅ 25 specialized post types across 5 domains
- ✅ Responsive design (mobile & desktop)
- ✅ Dark mode support

## Project Structure

- `src/components/` - React components
- `src/pages/` - Page components
- `src/lib/` - Utilities and API client
- `src/components/posts/` - Post type components

## Next Steps

1. Connect to your backend API
2. Run database migrations (see main project)
3. Start creating posts with different domains and types!

