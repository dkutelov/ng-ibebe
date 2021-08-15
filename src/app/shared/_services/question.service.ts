import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IQuestion, IQuestionCreate } from '../_models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  // private questions = new BehaviorSubject<IQuestion[] | null>(null);
  // questions$ = this.questions.asObservable();

  // private question = new BehaviorSubject<IQuestion | null>(null);
  // question$ = this.question.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadQuestions(category: string = '') {
    return this.httpClient.get<IQuestion[]>(
      `${environment.baseApiUrl}/questions`,
    );
  }

  // loadQuestions(): void {

  //   this.httpClient.get(`${environment.baseApiUrl}/questions`);

  //   //let query = '';
  //   //this.questions.next(null);
  //   //this.httpClient.get<IQuestion[]>(`${environment.baseApiUrl}/questions`);
  //   // .subscribe((questions) => {
  //   //   console.log(questions);
  //   //   this.questions.next(questions);
  //   // });
  // }

  createQuestion(data: IQuestionCreate) {
    return this.httpClient.post<IQuestion>(
      `${environment.baseApiUrl}/questions`,
      data,
    );
  }
}
