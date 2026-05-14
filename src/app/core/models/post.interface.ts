export interface Post {
    _id: string;
    body?: string;
    image?: string;
  
    privacy: 'public' | 'friends' | 'private';
  
    user: {
      _id: string;
      name: string;
      username: string;
      photo: string;
    };
  
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
  
    createdAt: string;
  
    bookmarked: boolean;
    isShare: boolean;
  
    likes: string[];
    
    // add this
    isLiked?: boolean;
  }