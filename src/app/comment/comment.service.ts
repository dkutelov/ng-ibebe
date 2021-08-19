import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IComment, ICommentCreate } from './comment.model';

@Injectable()
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  createCommentToQuestion(questionId: string, comment: ICommentCreate) {
    return this.httpClient.post<IComment>(
      `${environment.baseApiUrl}/questions/${questionId}/comments`,
      comment,
    );
  }

  createCommentToAnswer(answerId: string, comment: ICommentCreate) {
    return this.httpClient.post<IComment>(
      `${environment.baseApiUrl}/answers/${answerId}/comments`,
      comment,
    );
  }
}
