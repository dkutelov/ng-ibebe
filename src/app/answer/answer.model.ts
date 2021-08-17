export interface IAnswer {
  _id: string | undefined;
  question: string;
  text: string;
  imageURL: string[];
  author: string;
  created: Date;
  upVotes: string[];
  downVotes: string[];
  upVotesCount: number;
  downVotesCount: number;
  comments: string[];
}
