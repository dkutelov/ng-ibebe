import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../../shared/_models/question';

@Component({
  selector: 'app-questions-list-item',
  templateUrl: './questions-list-item.component.html',
  styleUrls: ['./questions-list-item.component.css'],
})
export class QuestionsListItemComponent implements OnInit {
  @Input() question: IQuestion | undefined;
  constructor() {}

  ngOnInit(): void {}
}
