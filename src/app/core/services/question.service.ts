import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  IQuestion,
  IQuestionCreate,
  IQuestionVote,
} from 'src/app/shared/interfaces/question';
import { IComment } from 'src/app/shared/interfaces/comment';
import { IQueryMap } from 'src/app/shared/interfaces/query-map';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions = new BehaviorSubject<IQuestion[] | null>(null);
  questions$ = this.questions.asObservable();

  // private question = new BehaviorSubject<IQuestion | null>(null);
  // question$ = this.question.asObservable();

  private questionComments = new BehaviorSubject<IComment[] | null>(null);
  questionComments$ = this.questionComments.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadQuestions(queryParams: IQueryMap = {}): void {
    let query = this.getAllQuery(queryParams);
    this.questions.next(null);
    this.httpClient
      .get<IQuestion[]>(`/api/questions${query}`)
      .subscribe((questions) => {
        console.log(questions);

        if (questions.length > 0) {
          this.questions.next(questions);
        }
      });
  }

  getQuestions(queryParams: IQueryMap = {}): Observable<IQuestion[]> {
    let query = this.getAllQuery(queryParams);
    return this.httpClient.get<IQuestion[]>(`/api/questions${query}`);
  }

  loadQuestion = (id: number) => {
    return this.httpClient.get<IQuestion>(`/api/questions/${id}`);
  };

  createQuestion(data: IQuestionCreate): Observable<IQuestion> {
    return this.httpClient.post<IQuestion>(`/api/questions`, data);
  }

  deleteQuestion(questionId: string) {
    return this.httpClient.delete<IQuestion>(`/api/questions/${questionId}`);
  }

  updateQuestion(
    questionData: IQuestionCreate,
    questionId: string,
  ): Observable<IQuestion> {
    return this.httpClient.put<IQuestion>(`/api/questions`, {
      questionData,
      questionId,
    });
  }

  vote(questionId: string, voteType: string, userId: string) {
    return this.httpClient.post<IQuestionVote>(`/api/questions/vote`, {
      questionId,
      voteType,
      userId,
    });
  }

  loadCommentsByQuestionId(questionId: string): void {
    this.questionComments.next(null);
    this.httpClient
      .get<IComment[]>(`/api/questions/${questionId}/comments`)
      .subscribe((comments) => {
        this.questionComments.next(comments);
      });
  }

  loadQuestionsByUserId(userId: string): Observable<IQuestion[]> {
    return this.httpClient.get<IQuestion[]>(`/api/questions/user/${userId}`);
  }

  getAllQuery(queryParams: IQueryMap): string {
    if (Object.keys(queryParams).length === 0) return '';

    let query = '?';
    const params: string[] = Object.keys(queryParams).map((k: string) => {
      return `${k}=${queryParams[k]}`;
    });

    return query.concat(params.join('&'));
  }
}
