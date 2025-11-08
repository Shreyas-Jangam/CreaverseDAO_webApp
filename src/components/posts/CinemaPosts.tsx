import { useState } from 'react';
import { Star, Film, Award } from 'lucide-react';
import PostCard from './PostCard';
import { Button } from '../ui/button';
import { Post } from '@/lib/api';

export function BehindTheTokenPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [showDashboard, setShowDashboard] = useState(false);
  const royaltySplit = post.metadata?.royaltySplit || {};

  return (
    <PostCard post={post} {...props}>
      {post.media_urls?.[0] && (
        <div className="relative">
          <video
            src={post.media_urls[0]}
            className="w-full"
            style={{ maxHeight: '400px' }}
            controls
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-black/70"
            onClick={() => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? 'Hide' : 'Show'} Royalties
          </Button>
        </div>
      )}
      {showDashboard && (
        <div className="p-4 bg-slate-800">
          <p className="mb-4 font-semibold text-white">Royalty Split Dashboard</p>
          {Object.entries(royaltySplit).map(([role, percentage]) => (
            <div key={role} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-slate-300 capitalize">{role}</span>
                <span className="text-sm font-semibold text-blue-400">{percentage}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </PostCard>
  );
}

export function FirstViewerReviewPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [rating, setRating] = useState(post.metadata?.rating || 7);
  return (
    <PostCard post={post} {...props}>
      {post.media_urls?.[0] && (
        <img src={post.media_urls[0]} alt="Review" className="w-full object-cover" style={{ maxHeight: '300px' }} />
      )}
      <div className="p-4 bg-slate-800">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-white">Rating</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`h-6 w-6 rounded-full ${
                  num <= rating ? 'bg-yellow-400' : 'bg-slate-700'
                }`}
              >
                <Star className={`h-3 w-3 mx-auto ${num <= rating ? 'text-black' : 'text-slate-500'}`} fill={num <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </PostCard>
  );
}

export function CinematicCollabCallPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const roles = post.metadata?.openRoles || ['Editor', 'Sound Designer'];
  return (
    <PostCard post={post} {...props}>
      {post.media_urls?.[0] && (
        <img src={post.media_urls[0]} alt="Collab" className="w-full object-cover" style={{ maxHeight: '300px' }} />
      )}
      <div className="p-4 bg-slate-800">
        <p className="mb-4 font-semibold text-white">Open Roles</p>
        {roles.map((role, index) => (
          <div key={index} className="flex justify-between items-center mb-2 p-3 bg-slate-900 rounded">
            <span className="text-white">{role}</span>
            <Button size="sm">Join Project</Button>
          </div>
        ))}
      </div>
    </PostCard>
  );
}

export function FilmCriticSpotlightPost({ post, ...props }: { post: Post; [key: string]: any }) {
  return (
    <PostCard post={post} {...props}>
      <div className="grid grid-cols-2">
        <img src={post.profile_image_url} alt="Critic" className="h-64 w-full object-cover" />
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Review" className="h-64 w-full object-cover" />
        )}
      </div>
      <div className="p-4 bg-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-5 w-5 text-yellow-400" />
          <span className="font-semibold text-white">DAO Verified Critic</span>
        </div>
      </div>
    </PostCard>
  );
}

export function FestivalDAOPremierePost({ post, ...props }: { post: Post; [key: string]: any }) {
  const films = post.metadata?.nominatedFilms || [];
  return (
    <PostCard post={post} {...props}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {films.length > 0 ? (
          films.map((film: any, index: number) => (
            <div key={index} className="min-w-[200px]">
              <img
                src={film.thumbnail || post.media_urls?.[index]}
                alt={film.title}
                className="h-64 w-full rounded object-cover"
              />
              <div className="p-3 bg-slate-800 rounded-b">
                <p className="mb-2 font-semibold text-white">{film.title}</p>
                <Button size="sm" className="w-full">Vote for Best Short</Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400">No films available</p>
        )}
      </div>
    </PostCard>
  );
}

export const CinemaPostComponents = {
  behind_the_token: BehindTheTokenPost,
  first_viewer_review: FirstViewerReviewPost,
  cinematic_collab_call: CinematicCollabCallPost,
  film_critic_spotlight: FilmCriticSpotlightPost,
  festival_dao_premiere: FestivalDAOPremierePost,
};

