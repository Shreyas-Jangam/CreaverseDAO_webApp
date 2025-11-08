# Creaverse Web App

A modern web application for the Creaverse multi-category creative platform, featuring 25 different post types across 5 creative domains (Art, Cinema, Books, Nature, Music) with full $CREO token economy integration.

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router v7** - Modern routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

## Features

✅ Multi-domain post support (Art, Cinema, Books, Nature, Music)
✅ 25 unique post types with specialized UI
✅ Token earnings tracking
✅ Smart contract integration links
✅ DAO tags and labels
✅ Engagement buttons (Like, Comment, Share, Tip)
✅ Real-time updates and progress tracking
✅ Responsive design (mobile-first)
✅ Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:4000/api
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout with navigation
│   ├── posts/
│   │   ├── PostCard.tsx    # Base post component
│   │   ├── PostRenderer.tsx # Routes to domain-specific components
│   │   ├── ArtPosts.tsx   # Art domain components (5 types)
│   │   ├── CinemaPosts.tsx # Cinema domain components (5 types)
│   │   ├── BooksPosts.tsx  # Books domain components (5 types)
│   │   ├── NaturePosts.tsx # Nature domain components (5 types)
│   │   └── MusicPosts.tsx  # Music domain components (5 types)
│   └── ui/                 # Reusable UI components
├── pages/
│   ├── Feed.tsx            # Main feed page
│   ├── Profile.tsx        # User profile
│   ├── Create.tsx          # Create post page
│   └── Settings.tsx       # Settings page
├── lib/
│   ├── api.ts             # API client functions
│   └── utils.ts           # Utility functions
└── main.tsx               # App entry point
```

## API Integration

The app expects a backend API at the URL specified in `VITE_API_URL`. The API should provide:

- `GET /api/posts` - Fetch posts
- `POST /api/posts` - Create post
- `POST /api/posts/interactions` - Like, comment, tip posts

See `src/lib/api.ts` for the API client implementation.

## Post Types

Each domain has 5 specialized post types:

### Art Domain
- Process Drop
- Collector's Insight
- Mint Day Collab
- AI vs. Human Art
- DAO Exhibition

### Cinema Domain
- Behind the Token
- First Viewer Review
- Cinematic Collab Call
- Film Critic Spotlight
- Festival DAO Premiere

### Books Domain
- Chapter 1 Drop
- Review-to-Earn Book Club
- Author AMA
- Co-Author Challenge
- Reader's Proof

### Nature Domain
- Tree-Planting DAO Report
- Adopt a Tree NFT
- GeoDAO Cleanup Quest
- Eco Review Bounty
- Sustainable Artist Drop

### Music Domain
- Debut Drop
- Fan Review Spotlight
- Collab Session Live
- Playlist Curation Quest
- DAO Remix Challenge

## Development

### Adding New Post Types

1. Add the component to the appropriate domain file (e.g., `ArtPosts.tsx`)
2. Export it from the domain's component map
3. The `PostRenderer` will automatically route to it based on `domain` and `post_type`

### Styling

The app uses Tailwind CSS with a custom dark theme. Colors are defined in `src/index.css` using CSS variables.

## License

MIT

