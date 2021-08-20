export interface IComment {
  _id: string | undefined;
  text: string;
  author: IAuthor;
  created: Date;
  likes: number;
  commentTo: string;
}

export interface ICommentCreate {
  text: string;
  author: string;
}

export interface IAuthor {
  _id: string;
  username: string | undefined;
  email: string;
  avatar: string;
}
