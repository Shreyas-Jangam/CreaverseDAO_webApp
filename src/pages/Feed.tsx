import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, likePost, tipPost, Post } from '@/lib/api';
import PostRenderer from '@/components/posts/PostRenderer';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const MOCK_USER_ID = 1;

export default function Feed() {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading, refetch } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  });

  const likeMutation = useMutation({
    mutationFn: ({ postId }: { postId: number }) => likePost(MOCK_USER_ID, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const tipMutation = useMutation({
    mutationFn: ({ postId, amount }: { postId: number; amount: number }) =>
      tipPost(MOCK_USER_ID, postId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleLike = (postId: number) => {
    likeMutation.mutate({ postId });
  };

  const handleTip = (postId: number) => {
    tipMutation.mutate({ postId, amount: 10 });
  };

  const handleViewContract = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  const handleShare = (postId: number) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post on Creaverse',
        url: `${window.location.origin}/post/${postId}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    }
  };

  const handleComment = (postId: number) => {
    // TODO: Implement comment modal
    console.log('Comment on post:', postId);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-400" />
          <p className="mt-4 text-slate-400">Loading feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Feed</h1>
          <p className="mt-1 text-slate-400">Discover creative content from all domains</p>
        </div>
        <Button variant="outline" onClick={() => refetch()} className="border-slate-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-12 text-center">
          <h2 className="text-xl font-semibold text-white">Welcome to Creaverse</h2>
          <p className="mt-2 text-slate-400">
            Start following creators and engaging with the community to see posts here
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostRenderer
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onTip={handleTip}
              onViewContract={handleViewContract}
            />
          ))}
        </div>
      )}
    </div>
  );
}

