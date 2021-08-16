export interface IComment {
  _id: string | undefined;
  text: string;
  author: string;
  created: Date;
  likes: number;
}
