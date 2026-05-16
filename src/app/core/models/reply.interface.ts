export interface Reply {
    _id:            string;
    content:        string;
    commentCreator: CommentCreator;
    post:           string;
    parentComment:  string;
    likes:          any[];
    createdAt:      Date;
    likesCount:     number;
    isReply:        boolean;
    id:             string;
}

export interface CommentCreator {
    _id:            string;
    name:           string;
    username:       string;
    photo:          string;
    followersCount: number;
    followingCount: number;
    bookmarksCount: number;
    id:             string;
}