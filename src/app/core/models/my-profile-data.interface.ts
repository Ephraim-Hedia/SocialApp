export interface MyProfileData {
    _id:               string;
    name:              string;
    username:          string;
    email:             string;
    dateOfBirth:       Date;
    gender:            string;
    photo:             string;
    cover:             string;
    bookmarks:         any[];
    followers:         any[];
    following:         string[];
    createdAt:         Date;
    passwordChangedAt: Date;
    followersCount:    number;
    followingCount:    number;
    bookmarksCount:    number;
    id:                string;
    
}
