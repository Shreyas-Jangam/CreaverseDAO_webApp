const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface Post {
  id: number;
  user_id: number;
  content_type: string;
  domain?: string;
  post_type?: string;
  media_urls?: string[];
  caption?: string;
  hashtags?: string[];
  creator_tags?: string[];
  royalty_split?: Record<string, number>;
  dao_tag?: string;
  smart_contract_address?: string;
  metadata?: Record<string, any>;
  created_at: string;
  username: string;
  display_name: string;
  profile_image_url: string;
  dao_role?: string;
  likes_count: number;
  comments_count: number;
  tips_received: number;
  token_earnings?: number;
}

export interface CreatePostData {
  userId: number;
  contentType: string;
  domain?: string;
  postType?: string;
  mediaUrls?: string[];
  caption?: string;
  hashtags?: string[];
  creatorTags?: string[];
  royaltySplit?: Record<string, number>;
  daoTag?: string;
  smartContractAddress?: string;
  metadata?: Record<string, any>;
}

export async function fetchPosts(limit = 20, offset = 0): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function createPost(data: CreatePostData): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
}

export async function likePost(userId: number, postId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/interactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      postId,
      interactionType: 'like',
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to like post');
  }
}

export async function tipPost(
  userId: number,
  postId: number,
  amount: number
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/interactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      postId,
      interactionType: 'tip',
      tipAmount: amount,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to tip post');
  }
}

export async function commentPost(
  userId: number,
  postId: number,
  commentText: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/interactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      postId,
      interactionType: 'comment',
      commentText,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to comment on post');
  }
}

