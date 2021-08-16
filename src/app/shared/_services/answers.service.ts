import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAnswer } from '../_models/answer';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private answers = new BehaviorSubject<IAnswer[] | null>(null);
  answers$ = this.answers.asObservable();

  // private question = new BehaviorSubject<IQuestion | null>(null);
  // question$ = this.question.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadAnswers(): void {
    this.httpClient.get(`${environment.baseApiUrl}/questions`);
    let query = '';
    this.answers.next(null);

    this.httpClient
      .get<IAnswer[]>(`${environment.baseApiUrl}/answers`)
      .subscribe((answers) => {
        console.log(answers);
        this.answers.next(answers);
      });
  }

  // loadQuestion = (id: number) => {
  //   this.question.next(null);

  //   this.httpClient
  //     .get<IQuestion>(`${environment.baseApiUrl}/questions/${id}`)
  //     .subscribe((question) => {
  //       this.question.next(question);
  //     });
  // };

  createAnswer(data: IAnswer) {
    return this.httpClient.post<IAnswer>(
      `${environment.baseApiUrl}/answers`,
      data,
    );
  }

  vote(questionId: string, voteType: string, userId: string) {
    return this.httpClient.post<IAnswer>(
      `${environment.baseApiUrl}/questions/vote`,
      { questionId, voteType, userId },
    );
  }
}
