import { ITag } from './tag';

export interface IQuestion {
  title: string;
  text: string;
  imageURL: string[];
  views: number;
  votes: Votes;
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
