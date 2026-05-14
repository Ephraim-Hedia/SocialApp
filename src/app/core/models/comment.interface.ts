export interface Comment {

    _id: string;
  
    content: string;
  
    createdAt: string;
  
    user: {
      _id: string;
      name: string;
      username: string;
      photo: string;
    };
  
  }