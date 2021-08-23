import { ITag } from './tag';

export interface IQuestion {
  title: string;
  text: string;
  imageURL: { imageURL: string }[];
  author: IAuthor;
  views: number;
  votes: Votes;
  upVotesCount: number;
  downVotesCount: number;
  tags: ITag[];
  answers: any[];
  comments: any[];
  category: {
    _id: string;
    name: string;
  };
  created: Date;
  answersCount: number;
  id: string;
}

export interface Votes {
  up: number;
  down: number;
}

export interface IQuestionCreate {
  title: string;
  text: string;
  category: string;
  tags: ITag[];
  imageURL: string[];
}

export interface IAuthor {
  _id: string;
  username: string | undefined;
  email: string;
  avatar: string;
}

export interface IQuestionVote {
  message: string;
  updatedVotesCount: {
    upVotesCount: number;
    downVotesCount: number;
  };
}
