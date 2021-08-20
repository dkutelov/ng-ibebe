import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IAnswer, IAnswerVote } from '../../shared/interfaces/answer';
import { IComment } from '../../shared/interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private answers = new BehaviorSubject<IAnswer[] | null>(null);
  answers$ = this.answers.asObservable();

  private answerComments = new Subject<IComment[] | null>();
  answerComments$ = this.answerComments.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadAnswers(questionId: string): void {
    this.answers.next(null);

    this.httpClient
      .get<IAnswer[]>(`/api/answers?questionId=${questionId}`)
      .subscribe((answers) => {
        this.answers.next(answers);
      });
  }

  createAnswer(data: IAnswer) {
    return this.httpClient.post<IAnswer>(`/api/answers`, data);
  }

  vote(answerId: string, voteType: string, userId: string) {
    return this.httpClient.post<IAnswerVote>(`/api/answers/vote`, {
      answerId,
      voteType,
      userId,
    });
  }

  loadCommentsByAnswerId(answerId: string) {
    return this.httpClient.get<IComment[]>(`/api/answers/${answerId}/comments`);
  }
}
