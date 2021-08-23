import { IQuestion } from '../../shared/interfaces/question';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-card-details',
  templateUrl: './question-card-details.component.html',
  styleUrls: ['./question-card-details.component.css'],
})
export class QuestionCardDetailsComponent {
  @Input() question!: IQuestion;
  constructor() {}
}
