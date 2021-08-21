import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IQuestion } from 'src/app/shared/interfaces/question';

@Component({
  selector: 'app-question-preview-list',
  templateUrl: './question-preview-list.component.html',
  styleUrls: ['./question-preview-list.component.css'],
})
export class QuestionPreviewListComponent implements OnInit, OnChanges {
  @Input() questionsData!: IQuestion[];
  questions: IQuestion[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.questionsData.previousValue !== changes.questionsData.currentValue
    ) {
      this.questions = changes.questionsData.currentValue;
    }
  }

  ngOnInit(): void {}
}
