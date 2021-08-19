import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAnswer, IAnswerVote } from './answer.model';
import { IComment } from '../comment/comment.model';
import { concatMap } from 'rxjs/operators';

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
      .get<IAnswer[]>(
        `${environment.baseApiUrl}/answers?questionId=${questionId}`,
      )
      .subscribe((answers) => {
        this.answers.next(answers);
      });
  }

  createAnswer(data: IAnswer) {
    return this.httpClient.post<IAnswer>(
      `${environment.baseApiUrl}/answers`,
      data,
    );
  }

  vote(answerId: string, voteType: string, userId: string) {
    return this.httpClient.post<IAnswerVote>(
      `${environment.baseApiUrl}/answers/vote`,
      { answerId, voteType, userId },
    );
  }

  loadCommentsByAnswerId(answerId: string) {
    return this.httpClient.get<IComment[]>(
      `${environment.baseApiUrl}/answers/${answerId}/comments`,
    );
  }
}
