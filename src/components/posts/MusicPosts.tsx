import { useState } from 'react';
import { Play, Pause, Music, Headphones, Users, Upload, Award } from 'lucide-react';
import PostCard from './PostCard';
import { Button } from '../ui/button';
import { Post } from '@/lib/api';

export function DebutDropPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isEarlyListener = post.metadata?.isEarlyListener || false;

  return (
    <PostCard post={post} {...props}>
      <div className="relative">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Track" className="w-full object-cover" style={{ maxHeight: '400px' }} />
        )}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500/80 h-20 w-20 rounded-full flex items-center justify-center hover:bg-blue-500"
        >
          {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white ml-1" />}
        </button>
      </div>
      {isEarlyListener && (
        <div className="p-4 bg-blue-500/20 border-t border-blue-500/30">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-400" />
            <p className="text-sm text-blue-400">Early listener detected → token airdrop pending</p>
          </div>
        </div>
      )}
    </PostCard>
  );
}

export function FanReviewSpotlightPost({ post, ...props }: { post: Post; [key: string]: any }) {
  return (
    <PostCard post={post} {...props}>
      <div className="grid grid-cols-2">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Track" className="h-64 w-full object-cover" />
        )}
        <div className="p-4 bg-slate-800 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Headphones className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-white">Fan Review</span>
          </div>
          <p className="text-white text-sm">{post.caption || 'Amazing track!...'}</p>
        </div>
      </div>
    </PostCard>
  );
}

export function CollabSessionLivePost({ post, ...props }: { post: Post; [key: string]: any }) {
  const isLive = post.metadata?.isLive || true;
  const collaborators = post.metadata?.collaborators || [
    { name: 'Artist 1', image: post.profile_image_url },
    { name: 'Artist 2', image: post.media_urls?.[1] },
  ];

  return (
    <PostCard post={post} {...props}>
      <div className="grid grid-cols-2">
        {collaborators.map((collab: any, index: number) => (
          <div key={index} className="relative">
            <img src={collab.image} alt={collab.name} className="h-64 w-full object-cover" />
            {isLive && (
              <div className="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded text-xs font-semibold text-white">
                LIVE
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
              <p className="text-xs text-white">{collab.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-800">
        <Button className={isLive ? 'bg-red-500 hover:bg-red-600 w-full' : 'w-full'}>
          {isLive ? 'Join Live Session' : 'View Recording'}
        </Button>
      </div>
    </PostCard>
  );
}

export function PlaylistCurationQuestPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const tracks = post.metadata?.tracks || [];
  return (
    <PostCard post={post} {...props}>
      <div className="p-4 bg-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <Music className="h-6 w-6 text-blue-400" />
          <div>
            <p className="font-semibold text-white">{post.metadata?.playlistName || 'Curated Playlist'}</p>
            <p className="text-sm text-slate-400">{tracks.length} tracks</p>
          </div>
        </div>
        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {tracks.map((track: any, index: number) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-slate-900 rounded">
              <div className="h-10 w-10 bg-slate-700 rounded flex items-center justify-center">
                <Play className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{track.title}</p>
                <p className="text-xs text-slate-400">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full">Listen All</Button>
      </div>
    </PostCard>
  );
}

export function DAORemixChallengePost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  return (
    <PostCard post={post} {...props}>
      <div className="p-4 bg-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <Music className="h-6 w-6 text-blue-400" />
          <div>
            <p className="font-semibold text-white">Original Track</p>
            <p className="text-sm text-slate-400">{post.metadata?.remixCount || 12} remixes submitted</p>
          </div>
        </div>
        <div className="h-20 bg-slate-900 rounded flex items-center gap-3 p-4 mb-4">
          <button className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Play className="h-5 w-5 text-white ml-0.5" />
          </button>
          <div>
            <p className="text-sm font-semibold text-white">{post.metadata?.trackName || 'Original Track'}</p>
            <p className="text-xs text-slate-400">{post.display_name}</p>
          </div>
        </div>
        {!hasSubmitted ? (
          <Button onClick={() => setHasSubmitted(true)} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Submit Remix
          </Button>
        ) : (
          <div className="p-4 bg-blue-500/20 rounded text-center">
            <Award className="mx-auto h-8 w-8 text-blue-400 mb-2" />
            <p className="font-semibold text-blue-400 mb-1">Remix Submitted!</p>
            <p className="text-sm text-slate-400">Smart contract tracks remix lineage & royalties</p>
          </div>
        )}
      </div>
    </PostCard>
  );
}

export const MusicPostComponents = {
  debut_drop: DebutDropPost,
  fan_review_spotlight: FanReviewSpotlightPost,
  collab_session_live: CollabSessionLivePost,
  playlist_curation_quest: PlaylistCurationQuestPost,
  dao_remix_challenge: DAORemixChallengePost,
};

