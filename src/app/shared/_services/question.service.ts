import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IQuestion, IQuestionCreate, IQuestionVote } from '../_models/question';
import { IComment } from 'src/app/comment/comment.model';

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

  loadQuestions(): void {
    this.httpClient.get(`${environment.baseApiUrl}/questions`);
    let query = '';
    this.questions.next(null);

    this.httpClient
      .get<IQuestion[]>(`${environment.baseApiUrl}/questions`)
      .subscribe((questions) => {
        if (questions.length > 0) {
          this.questions.next(questions);
        }
      });
  }

  loadQuestion = (id: number) => {
    this.question.next(null);

    return this.httpClient.get<IQuestion>(
      `${environment.baseApiUrl}/questions/${id}`,
    );
  };

  createQuestion(data: IQuestionCreate) {
    return this.httpClient.post<IQuestion>(
      `${environment.baseApiUrl}/questions`,
      data,
    );
  }

  vote(questionId: string, voteType: string, userId: string) {
    return this.httpClient.post<IQuestionVote>(
      `${environment.baseApiUrl}/questions/vote`,
      { questionId, voteType, userId },
    );
  }

  loadCommentsByQuestionId(questionId: string) {
    this.questionComments.next(null);
    this.httpClient
      .get<IComment[]>(
        `${environment.baseApiUrl}/questions/${questionId}/comments`,
      )
      .subscribe((comments) => {
        console.log(comments);

        this.questionComments.next(comments);
      });
  }
}
