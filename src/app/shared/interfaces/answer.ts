export interface IAnswer {
  _id: string | undefined;
  question: string;
  text: string;
  imageURL: { imageURL: string }[];
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  created: Date;
  upVotes: string[];
  downVotes: string[];
  upVotesCount: number;
  downVotesCount: number;
  comments: string[];
}

export interface IAnswerVote {
  message: string;
  updatedVotesCount: {
    upVotesCount: number;
    downVotesCount: number;
  };
}
