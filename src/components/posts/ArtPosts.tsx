import { useState, useEffect } from 'react';
import { Sparkles, Users, Award } from 'lucide-react';
import PostCard from './PostCard';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Post } from '@/lib/api';

// Placeholder components - will be fully implemented
export function ProcessDropPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [mintingProgress, setMintingProgress] = useState(0);
  const [critiqueMode, setCritiqueMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMintingProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <PostCard post={post} {...props}>
      <div className="relative">
        {post.media_urls?.[0] && (
          <video
            src={post.media_urls[0]}
            className="w-full"
            style={{ maxHeight: '400px' }}
            autoPlay
            loop
            muted
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
          <p className="mb-2 text-sm font-medium text-white">Minting Progress</p>
          <Progress value={mintingProgress} className="mb-2" />
          <p className="text-xs text-slate-300">{mintingProgress}% complete</p>
        </div>
      </div>
      <div className="p-4">
        <Button
          variant={critiqueMode ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCritiqueMode(!critiqueMode)}
          className="w-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {critiqueMode ? 'Critique Mode: ON' : 'Enable Critique Mode'}
        </Button>
      </div>
    </PostCard>
  );
}

export function CollectorsInsightPost({ post, ...props }: { post: Post; [key: string]: any }) {
  return (
    <PostCard post={post} {...props}>
      <div className="grid grid-cols-2">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="NFT" className="h-64 w-full object-cover" />
        )}
        {post.media_urls?.[1] && (
          <img src={post.media_urls[1]} alt="Collector" className="h-64 w-full object-cover" />
        )}
      </div>
    </PostCard>
  );
}

export function MintDayCollabPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const royaltySplit = post.metadata?.royaltySplit || { artist: 60, collector: 40 };
  return (
    <PostCard post={post} {...props}>
      {post.media_urls?.[0] && (
        <img src={post.media_urls[0]} alt="Collab" className="w-full object-cover" style={{ maxHeight: '400px' }} />
      )}
      <div className="p-4 bg-slate-800">
        <p className="mb-2 font-semibold text-white">Royalty Split</p>
        <div className="flex h-6 rounded overflow-hidden mb-2">
          <div
            className="bg-blue-500 flex items-center justify-center text-xs text-white"
            style={{ width: `${royaltySplit.artist}%` }}
          >
            {royaltySplit.artist}%
          </div>
          <div
            className="bg-purple-500 flex items-center justify-center text-xs text-white"
            style={{ width: `${royaltySplit.collector}%` }}
          >
            {royaltySplit.collector}%
          </div>
        </div>
      </div>
    </PostCard>
  );
}

export function AIVsHumanArtPost({ post, ...props }: { post: Post; [key: string]: any }) {
  return (
    <PostCard post={post} {...props}>
      <div className="grid grid-cols-2">
        {post.media_urls?.[0] && (
          <div className="relative">
            <img src={post.media_urls[0]} alt="AI Art" className="h-64 w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
              <p className="text-xs text-white">AI Generated</p>
            </div>
          </div>
        )}
        {post.media_urls?.[1] && (
          <div className="relative">
            <img src={post.media_urls[1]} alt="Human Art" className="h-64 w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
              <p className="text-xs text-white">Human Created</p>
            </div>
          </div>
        )}
      </div>
    </PostCard>
  );
}

export function DAOExhibitionPost({ post, ...props }: { post: Post; [key: string]: any }) {
  return (
    <PostCard post={post} {...props}>
      {post.media_urls?.[0] && (
        <div className="relative">
          <img src={post.media_urls[0]} alt="Exhibition" className="w-full object-cover" style={{ maxHeight: '400px' }} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {post.metadata?.eventName || 'Virtual Gallery Exhibition'}
            </h3>
            <Button className="bg-blue-500 hover:bg-blue-600">Enter Gallery</Button>
          </div>
        </div>
      )}
    </PostCard>
  );
}

export const ArtPostComponents = {
  process_drop: ProcessDropPost,
  collectors_insight: CollectorsInsightPost,
  mint_day_collab: MintDayCollabPost,
  ai_vs_human: AIVsHumanArtPost,
  dao_exhibition: DAOExhibitionPost,
};

