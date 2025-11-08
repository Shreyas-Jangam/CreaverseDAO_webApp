import { useState } from 'react';
import { BookOpen, Lock, Unlock, MessageSquare, Award } from 'lucide-react';
import PostCard from './PostCard';
import { Button } from '../ui/button';
import { Post } from '@/lib/api';

export function Chapter1DropPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const unlockPrice = post.metadata?.unlockPrice || 25;

  return (
    <PostCard post={post} {...props}>
      <div className="relative">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Chapter" className="w-full object-cover" style={{ maxHeight: '400px' }} />
        )}
        {!isUnlocked && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-center">
            <Lock className="mx-auto h-8 w-8 text-white mb-2" />
            <p className="text-lg font-semibold text-white mb-2">Unlock Full Chapter</p>
            <Button onClick={() => setIsUnlocked(true)}>Stake {unlockPrice} CREO</Button>
          </div>
        )}
      </div>
      {isUnlocked && (
        <div className="p-4 bg-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Unlock className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-blue-400">Chapter Unlocked</span>
          </div>
          <p className="text-white">{post.metadata?.chapterText || post.caption || 'Chapter content...'}</p>
        </div>
      )}
    </PostCard>
  );
}

export function ReviewToEarnBookClubPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const aiRating = post.metadata?.aiRating || 85;
  return (
    <PostCard post={post} {...props}>
      <div className="grid grid-cols-2">
        {post.media_urls?.[0] && (
          <img src={post.media_urls[0]} alt="Book" className="h-64 w-full object-cover" />
        )}
        <div className="p-4 bg-slate-800 flex flex-col justify-center">
          <p className="mb-2 font-semibold text-white">Review Quality Score</p>
          <div className="h-2 bg-slate-700 rounded mb-2">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${aiRating}%` }} />
          </div>
          <p className="text-2xl font-bold text-blue-400">{aiRating}/100</p>
        </div>
      </div>
    </PostCard>
  );
}

export function AuthorAMAPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const isLive = post.metadata?.isLive || false;
  return (
    <PostCard post={post} {...props}>
      <div className="relative">
        <img
          src={post.media_urls?.[0] || post.profile_image_url}
          alt="AMA"
          className="w-full object-cover"
          style={{ maxHeight: '300px' }}
        />
        {isLive && (
          <div className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-full flex items-center gap-2">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-white">LIVE</span>
          </div>
        )}
      </div>
      <div className="p-4 bg-slate-800">
        <h3 className="text-lg font-semibold text-white mb-2">Ask Me Anything</h3>
        <Button className={isLive ? 'bg-red-500 hover:bg-red-600' : ''}>
          {isLive ? 'Join Live Room' : 'View Recording'}
        </Button>
      </div>
    </PostCard>
  );
}

export function CoAuthorChallengePost({ post, ...props }: { post: Post; [key: string]: any }) {
  return (
    <PostCard post={post} {...props}>
      <div className="p-4 bg-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Unfinished Chapter</h3>
        <p className="text-white mb-4">{post.metadata?.unfinishedChapter || post.caption || 'The story was reaching...'}</p>
        <Button className="w-full">Submit Ending</Button>
      </div>
    </PostCard>
  );
}

export function ReadersProofPost({ post, ...props }: { post: Post; [key: string]: any }) {
  const [isVerified, setIsVerified] = useState(post.metadata?.isVerified || false);
  return (
    <PostCard post={post} {...props}>
      <div className="p-4 bg-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className={`h-6 w-6 ${isVerified ? 'text-blue-400' : 'text-slate-400'}`} />
          <div>
            <p className="font-semibold text-white">Verify Chapter Ownership</p>
            <p className="text-sm text-slate-400">On-chain signature verification</p>
          </div>
        </div>
        {!isVerified ? (
          <Button onClick={() => setIsVerified(true)} className="w-full">Verify Ownership</Button>
        ) : (
          <div className="p-4 bg-blue-500/20 rounded text-center">
            <Award className="mx-auto h-8 w-8 text-blue-400 mb-2" />
            <p className="font-semibold text-blue-400 mb-1">Ownership Verified</p>
            <p className="text-sm text-slate-400">DAO Reputation Score boost applied</p>
          </div>
        )}
      </div>
    </PostCard>
  );
}

export const BooksPostComponents = {
  chapter_1_drop: Chapter1DropPost,
  review_to_earn_book_club: ReviewToEarnBookClubPost,
  author_ama: AuthorAMAPost,
  co_author_challenge: CoAuthorChallengePost,
  readers_proof: ReadersProofPost,
};

