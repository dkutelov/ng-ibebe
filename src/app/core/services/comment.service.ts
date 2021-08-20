import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IComment, ICommentCreate } from '../../shared/interfaces/comment';

@Injectable()
export class CommentService {
  private questionComments = new BehaviorSubject<IComment[] | null>(null);
  questionComments$ = this.questionComments.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadCommentsByQuestionId(questionId: string) {
    this.questionComments.next(null);
    this.httpClient
      .get<IComment[]>(`/api/questions/${questionId}/comments`)
      .subscribe((comments) => {
        this.questionComments.next(null);
      });
  }

  createCommentToQuestion(questionId: string, comment: ICommentCreate) {
    return this.httpClient.post<IComment>(
      `/api/questions/${questionId}/comments`,
      comment,
    );
  }

  createCommentToAnswer(answerId: string, comment: ICommentCreate) {
    return this.httpClient.post<IComment>(
      `/api/answers/${answerId}/comments`,
      comment,
    );
  }

  likeComment(userId: string, commentId: string) {
    return this.httpClient.post<{ likes: number }>(
      `/api/comments/${commentId}/like`,
      { userId },
    );
  }
}
