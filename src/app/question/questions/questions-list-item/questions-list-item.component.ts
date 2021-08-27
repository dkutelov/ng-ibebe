import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/question';

@Component({
  selector: 'app-questions-list-item',
  templateUrl: './questions-list-item.component.html',
  styleUrls: ['./questions-list-item.component.css'],
})
export class QuestionsListItemComponent {
  @Input() question: IQuestion | undefined;

  constructor() {}
}
