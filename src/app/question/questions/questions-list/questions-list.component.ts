import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IQueryMap } from 'src/app/shared/interfaces/query-map';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export class QuestionsListComponent implements OnInit {
  questions$ = this.questionService.questions$;

  constructor(
    public questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    let queryParams: IQueryMap = {};

    const category = this.activatedRoute.snapshot.queryParamMap.get('category');
    if (category) queryParams.category = category;

    this.questionService.loadQuestions(queryParams);
  }
}
