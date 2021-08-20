import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  IQuestion,
  IQuestionCreate,
  IQuestionVote,
} from 'src/app/shared/interfaces/question';
import { IComment } from 'src/app/shared/interfaces/comment';

interface MyMap {
  [key: string]: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions = new BehaviorSubject<IQuestion[] | null>(null);
  questions$ = this.questions.asObservable();

  private question = new BehaviorSubject<IQuestion | null>(null);
  question$ = this.question.asObservable();

  private questionComments = new BehaviorSubject<IComment[] | null>(null);
  questionComments$ = this.questionComments.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadQuestions(queryParams: MyMap = {}): void {
    let query = this.getAllQuery(queryParams);
    console.log(query);

    this.questions.next(null);

    this.httpClient
      .get<IQuestion[]>(`/api/questions${query}`)
      .subscribe((questions) => {
        if (questions.length > 0) {
          this.questions.next(questions);
        }
      });
  }

  loadQuestion = (id: number) => {
    this.question.next(null);

    return this.httpClient.get<IQuestion>(`/api/questions/${id}`);
  };

  createQuestion(data: IQuestionCreate) {
    return this.httpClient.post<IQuestion>(`/api/questions`, data);
  }

  vote(questionId: string, voteType: string, userId: string) {
    return this.httpClient.post<IQuestionVote>(`/api/questions/vote`, {
      questionId,
      voteType,
      userId,
    });
  }

  loadCommentsByQuestionId(questionId: string) {
    this.questionComments.next(null);
    this.httpClient
      .get<IComment[]>(`/api/questions/${questionId}/comments`)
      .subscribe((comments) => {
        console.log(comments);

        this.questionComments.next(comments);
      });
  }

  getAllQuery(queryParams: MyMap): string {
    if (Object.keys(queryParams).length === 0) return '';

    let query = '?';
    const params: string[] = Object.keys(queryParams).map((k: string) => {
      return `${k}=${queryParams[k]}`;
    });

    return query.concat(params.join('&'));
  }
}
