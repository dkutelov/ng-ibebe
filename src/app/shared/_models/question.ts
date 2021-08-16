import { ITag } from './tag';

export interface IQuestion {
  title: string;
  text: string;
  imageURL: string[];
  author: string;
  views: number;
  votes: Votes;
  upVotesCount: number;
  downVotesCount: number;
  tags: string[];
  answers: any[];
  comments: any[];
  category: string;
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
