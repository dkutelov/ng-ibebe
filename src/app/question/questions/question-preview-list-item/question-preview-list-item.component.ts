import { IQuestion } from './../../../shared/interfaces/question';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-preview-list-item',
  templateUrl: './question-preview-list-item.component.html',
  styleUrls: ['./question-preview-list-item.component.css'],
})
export class QuestionPreviewListItemComponent implements OnInit {
  @Input() questionData!: IQuestion;
  question!: IQuestion | null;

  constructor() {}

  ngOnInit(): void {
    this.question = this.questionData;
  }
}
