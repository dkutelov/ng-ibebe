import { Component, Input, OnInit } from '@angular/core';
import { IAnswer } from '../../answer.model';
import { AnswersService } from '../../answers.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css'],
})
export class AnswerListComponent implements OnInit {
  @Input() questionId!: string;
  answers$ = this.answersService.answers$;

  constructor(private answersService: AnswersService) {}

  ngOnInit(): void {
    this.answersService.loadAnswers(this.questionId);
  }
}
