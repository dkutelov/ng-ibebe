import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAnswer } from './answer.model';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private answers = new BehaviorSubject<IAnswer[] | null>(null);
  answers$ = this.answers.asObservable();

  // private question = new BehaviorSubject<IQuestion | null>(null);
  // question$ = this.question.asObservable();

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

  vote(answerId: string, voteType: string, userId: string) {
    return this.httpClient.post<IAnswer>(
      `${environment.baseApiUrl}/answers/vote`,
      { answerId, voteType, userId },
    );
  }
}
