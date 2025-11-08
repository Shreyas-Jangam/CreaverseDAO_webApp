import PostCard from './PostCard';
import { ArtPostComponents } from './ArtPosts';
import { CinemaPostComponents } from './CinemaPosts';
import { BooksPostComponents } from './BooksPosts';
import { NaturePostComponents } from './NaturePosts';
import { MusicPostComponents } from './MusicPosts';
import { Post } from '@/lib/api';

const DOMAIN_COMPONENTS = {
  art: ArtPostComponents,
  cinema: CinemaPostComponents,
  books: BooksPostComponents,
  nature: NaturePostComponents,
  music: MusicPostComponents,
};

interface PostRendererProps {
  post: Post;
  onLike?: (postId: number) => void;
  onComment?: (postId: number) => void;
  onShare?: (postId: number) => void;
  onTip?: (postId: number) => void;
  onViewContract?: (address: string) => void;
}

export default function PostRenderer({
  post,
  ...props
}: PostRendererProps) {
  // If post has domain and post_type, use specialized component
  if (post.domain && post.post_type) {
    const DomainComponents = DOMAIN_COMPONENTS[post.domain as keyof typeof DOMAIN_COMPONENTS];
    const PostComponent = DomainComponents?.[post.post_type as keyof typeof DomainComponents];

    if (PostComponent) {
      return <PostComponent post={post} {...props} />;
    }
  }

  // Fallback to base PostCard for posts without domain/post_type
  return <PostCard post={post} {...props} />;
}

