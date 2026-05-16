export interface Post {
    _id: string;
    body?: string;
    image?: string;
    privacy: 'public' | 'friends' | 'private';
  
    user: User;
  
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
  
    createdAt: string;
  
    bookmarked: boolean;
    isShare: boolean;
    topComment:    TopComment;
    likes: string[];
    
    // add this
    isLiked?: boolean;
  }
  export interface TopComment {
    _id:            string;
    content:        string;
    commentCreator: User;
    post:           string;
    parentComment:  null;
    likes:          any[];
    createdAt:      Date;
}
export interface User {
  _id:      string;
  name:     string;
  username: string;
  photo:    string;
}