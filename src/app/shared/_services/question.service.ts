import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IQuestion, IQuestionCreate } from '../_models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private httpClient: HttpClient) {}

  getQuestions(category: string = '') {
    return this.httpClient.get<IQuestion[]>(
      `${environment.baseApiUrl}/questions`,
    );
  }

  createQuestion(data: IQuestionCreate) {
    return this.httpClient.post<IQuestion>(
      `${environment.baseApiUrl}/questions`,
      data,
    );
  }
}
