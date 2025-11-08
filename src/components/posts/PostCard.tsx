import { Heart, MessageCircle, Send, DollarSign, ExternalLink, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { formatTimeAgo } from '@/lib/utils';
import { Post } from '@/lib/api';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onLike?: (postId: number) => void;
  onComment?: (postId: number) => void;
  onShare?: (postId: number) => void;
  onTip?: (postId: number) => void;
  onViewContract?: (address: string) => void;
  children?: React.ReactNode;
  hideDefaultContent?: boolean;
}

const getPostTypeLabel = (domain?: string, postType?: string): string => {
  const labels: Record<string, Record<string, string>> = {
    art: {
      process_drop: "The Process Drop",
      collectors_insight: "Collector's Insight",
      mint_day_collab: "Mint Day Collab",
      ai_vs_human: "AI vs. Human Art",
      dao_exhibition: "DAO Exhibition",
    },
    cinema: {
      behind_the_token: "Behind the Token",
      first_viewer_review: "First Viewer Review",
      cinematic_collab_call: "Cinematic Collab Call",
      film_critic_spotlight: "Film Critic Spotlight",
      festival_dao_premiere: "Festival DAO Premiere",
    },
    books: {
      chapter_1_drop: "Chapter 1 Drop",
      review_to_earn_book_club: "Review-to-Earn Book Club",
      author_ama: "Author AMA",
      co_author_challenge: "Co-Author Challenge",
      readers_proof: "Reader's Proof",
    },
    nature: {
      tree_planting_dao_report: "Tree-Planting DAO Report",
      adopt_a_tree_nft: "Adopt a Tree NFT",
      geodao_cleanup_quest: "GeoDAO Cleanup Quest",
      eco_review_bounty: "Eco Review Bounty",
      sustainable_artist_drop: "Sustainable Artist Drop",
    },
    music: {
      debut_drop: "Debut Drop",
      fan_review_spotlight: "Fan Review Spotlight",
      collab_session_live: "Collab Session Live",
      playlist_curation_quest: "Playlist Curation Quest",
      dao_remix_challenge: "DAO Remix Challenge",
    },
  };

  return labels[domain || '']?.[postType || ''] || postType || 'Post';
};

export default function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onTip,
  onViewContract,
  children,
  hideDefaultContent = false,
}: PostCardProps) {
  return (
    <Card className="mb-6 overflow-hidden border-slate-800 bg-slate-900/50">
      {/* Post Header */}
      <div className="flex items-center space-x-3 p-4 pb-3">
        <img
          src={post.profile_image_url}
          alt={post.display_name || post.username}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="font-semibold text-white">{post.display_name || post.username}</span>
            {post.dao_role && (
              <span
                className={cn(
                  'rounded px-2 py-0.5 text-xs font-medium',
                  post.dao_role === 'Creator'
                    ? 'bg-blue-500/20 text-blue-400'
                    : post.dao_role === 'Validator'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-slate-700 text-slate-300'
                )}
              >
                {post.dao_role}
              </span>
            )}
            {post.domain && post.post_type && (
              <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                {getPostTypeLabel(post.domain, post.post_type)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <span>@{post.username}</span>
            <span>·</span>
            <span>{formatTimeAgo(post.created_at)}</span>
            {post.dao_tag && (
              <>
                <span>·</span>
                <span className="text-blue-400">{post.dao_tag}</span>
              </>
            )}
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-300">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Post Content */}
      {children ? (
        children
      ) : (
        <>
          {post.media_urls && post.media_urls.length > 0 && (
            <img
              src={post.media_urls[0]}
              alt={post.caption || 'Post media'}
              className="w-full object-cover"
              style={{ maxHeight: '400px' }}
            />
          )}

          {post.caption && (
            <div className="p-4 pt-3">
              <p className="text-white">{post.caption}</p>
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="text-sm text-blue-400 hover:underline">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Token Earnings Tracker */}
      {(post.token_earnings || post.tips_received) && (
        <div className="border-y border-slate-800 bg-blue-500/10 px-4 py-2">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">
              {(post.token_earnings || post.tips_received || 0).toFixed(2)} CREO earned
            </span>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onLike?.(post.id)}
            className="flex items-center space-x-2 text-slate-400 hover:text-red-400"
          >
            <Heart className="h-5 w-5" />
            <span className="text-sm">{post.likes_count || 0}</span>
          </button>
          <button
            onClick={() => onComment?.(post.id)}
            className="flex items-center space-x-2 text-slate-400 hover:text-blue-400"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{post.comments_count || 0}</span>
          </button>
          <button
            onClick={() => onShare?.(post.id)}
            className="text-slate-400 hover:text-blue-400"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {post.smart_contract_address && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewContract?.(post.smart_contract_address!)}
              className="border-slate-700 bg-slate-800 text-blue-400 hover:bg-slate-700"
            >
              <ExternalLink className="mr-2 h-3 w-3" />
              Contract
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => onTip?.(post.id)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Tip
          </Button>
        </div>
      </div>
    </Card>
  );
}

