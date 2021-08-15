import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../../shared/_models/question';
import { QuestionService } from '../../../shared/_services/question.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export class QuestionsListComponent implements OnInit {
  questions: IQuestion[] = [];

  constructor(public questionService: QuestionService) {}
  loadQuestions = this.questionService.loadQuestions;

  ngOnInit(): void {
    this.loadQuestions().subscribe((q) => (this.questions = q));
  }
}
