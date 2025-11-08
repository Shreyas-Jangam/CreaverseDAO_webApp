import { useState } from 'react';
import { MapPin, Leaf, Award, Camera } from 'lucide-react';
import PostCard from './PostCard';
import { Button } from '../ui/button';
import { Post } from '@/lib/api';

export function TreePlantingDAOReportPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = post.media_urls || [];

  return (
    <PostCard post={post} {...props}>
      <div className="relative overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory">
          {images.map((uri, index) => (
            <img
              key={index}
              src={uri}
              alt={`Before/After ${index + 1}`}
              className="w-full h-64 object-cover snap-center"
            />
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      <div className="p-4 bg-slate-800">
        <p className="mb-4 font-semibold text-white">Before & After Verification</p>
        <Button className="w-full">Verify Data</Button>
      </div>
    </PostCard>
  );
}

export function AdoptATreeNFTPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const growthDays = post.metadata?.growthDays || 30;
  return (
    <PostCard post={post} {...props}>
      <div className="relative">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Tree" className="w-full object-cover" style={{ maxHeight: '400px' }} />
        )}
        <div className="absolute top-4 right-4 bg-black/70 p-3 rounded">
          <MapPin className="h-5 w-5 text-white mb-1" />
          <p className="text-xs text-white">{post.metadata?.location || 'Location'}</p>
        </div>
      </div>
      <div className="p-4 bg-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <Leaf className="h-6 w-6 text-green-400" />
          <div>
            <p className="font-semibold text-white">Growth Milestone</p>
            <p className="text-sm text-slate-400">{growthDays} days grown</p>
          </div>
        </div>
        <div className="h-2 bg-slate-700 rounded mb-4">
          <div className="h-full bg-green-500" style={{ width: `${Math.min(100, (growthDays / 365) * 100)}%` }} />
        </div>
      </div>
    </PostCard>
  );
}

export function GeoDAOCleanupQuestPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const participants = post.metadata?.participants || 23;
  return (
    <PostCard post={post} {...props}>
      <div className="relative">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Quest" className="w-full object-cover" style={{ maxHeight: '300px' }} />
        )}
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-3 rounded">
          <p className="font-semibold text-white mb-1">{post.metadata?.eventName || 'Cleanup Quest'}</p>
          <p className="text-sm text-slate-300">{participants} participants</p>
        </div>
      </div>
      <div className="p-4 bg-slate-800">
        <Button className="w-full">Join Event</Button>
      </div>
    </PostCard>
  );
}

export function EcoReviewBountyPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const bountyAmount = post.metadata?.bountyAmount || 100;
  return (
    <PostCard post={post} {...props}>
      <div className="relative">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Bounty" className="w-full object-cover" style={{ maxHeight: '300px' }} />
        )}
        <div className="absolute top-4 right-4 bg-black/80 p-3 rounded text-center">
          <p className="text-lg font-bold text-green-400">{bountyAmount} CREO</p>
          <p className="text-xs text-slate-300">Bounty</p>
        </div>
      </div>
      <div className="p-4 bg-slate-800">
        <p className="mb-4 font-semibold text-white">Satellite Image Verification Task</p>
        <Button className="w-full">Submit Verification</Button>
      </div>
    </PostCard>
  );
}

export function SustainableArtistDropPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const donationProgress = post.metadata?.donationProgress || 65;
  const targetAmount = post.metadata?.targetAmount || 1000;
  return (
    <PostCard post={post} {...props}>
      {post.media_urls?.[0] && (
        <img src={post.media_urls[0]} alt="Drop" className="w-full object-cover" style={{ maxHeight: '400px' }} />
      )}
      <div className="p-4 bg-slate-800">
        <p className="mb-2 font-semibold text-white">Donation Progress</p>
        <div className="h-3 bg-slate-700 rounded mb-2">
          <div className="h-full bg-green-500" style={{ width: `${donationProgress}%` }} />
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-white">{(targetAmount * (donationProgress / 100)).toFixed(0)} CREO</span>
          <span className="text-slate-400">of {targetAmount} CREO</span>
        </div>
        <Button className="w-full bg-green-500 hover:bg-green-600">Contribute to Cause</Button>
      </div>
    </PostCard>
  );
}

export const NaturePostComponents = {
  tree_planting_dao_report: TreePlantingDAOReportPost,
  adopt_a_tree_nft: AdoptATreeNFTPost,
  geodao_cleanup_quest: GeoDAOCleanupQuestPost,
  eco_review_bounty: EcoReviewBountyPost,
  sustainable_artist_drop: SustainableArtistDropPost,
};

