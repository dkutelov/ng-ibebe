import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../_models/question';
import { QuestionService } from '../../_services/question.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export class QuestionsListComponent implements OnInit {
  questions: IQuestion[] = [];
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService
      .getQuestions()
      .subscribe((questions) => (this.questions = questions));
  }
}
