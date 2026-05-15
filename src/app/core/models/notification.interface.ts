export interface Notification {
    _id:        string;
    recipient:  Actor;
    actor:      Actor;
    type:       string;
    entityType: string;
    entityId:   string;
    isRead:     boolean;
    createdAt:  Date;
    entity:     Entity;
}

export interface Actor {
    _id:       string;
    name:      string;
    photo:     string;
    username?: string;
}

export interface Entity {
    _id:           string;
    body:          string;
    image:         string;
    user:          string;
    commentsCount: number;
    topComment:    TopComment | null;
    sharesCount:   number;
    likesCount:    number;
    isShare:       boolean;
    id:            string;
}

export interface TopComment {
    _id:            string;
    content:        string;
    commentCreator: Actor;
    post:           string;
    parentComment:  null;
    likes:          any[];
    createdAt:      Date;
}
