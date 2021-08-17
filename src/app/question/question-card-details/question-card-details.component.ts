import { IQuestion } from './../../shared/_models/question';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-card-details',
  templateUrl: './question-card-details.component.html',
  styleUrls: ['./question-card-details.component.css'],
})
export class QuestionCardDetailsComponent {
  @Input() question!: IQuestion;
  constructor() {}
}