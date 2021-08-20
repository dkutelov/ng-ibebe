import { Subscription } from 'rxjs';
import { IQuestion } from './../../shared/interfaces/question';
import { QuestionService } from './../../core/services/question.service';
import { ToasterService } from '../../core/services/toaster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private questionService: QuestionService) {}
  private lastQuestions!: IQuestion[];

  ngOnInit(): void {
    let queryParams = {
      limit: '5',
      sort: 'top',
    };
    this.questionService.loadQuestions(queryParams);
  }
}
