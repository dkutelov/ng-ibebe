import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
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

  createAnswer(data: IAnswer): Observable<IAnswer> {
    return this.httpClient.post<IAnswer>(`/api/answers`, data);
  }

  updateAnswer(answer: IAnswer): Observable<IAnswer> {
    return this.httpClient.put<IAnswer>(`/api/answers`, { answer });
  }

  vote(
    answerId: string,
    voteType: string,
    userId: string,
  ): Observable<IAnswerVote> {
    return this.httpClient.post<IAnswerVote>(`/api/answers/vote`, {
      answerId,
      voteType,
      userId,
    });
  }

  loadCommentsByAnswerId(answerId: string): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(`/api/answers/${answerId}/comments`);
  }

  loadAnswerById = (id: number) => {
    return this.httpClient.get<IAnswer>(`/api/answers/${id}`);
  };

  loadAnswersByUserId(userId: string): Observable<IAnswer[]> {
    return this.httpClient.get<IAnswer[]>(`/api/answers/user/${userId}`);
  }

  deleteAnswer(answerId: string) {
    return this.httpClient.delete<IAnswer>(`/api/answers/${answerId}`);
  }
}
